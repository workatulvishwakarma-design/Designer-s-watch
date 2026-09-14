import { NextRequest, NextResponse } from "next/server";

// Valid Postal Circle 2-digit prefixes in India
const VALID_PIN_PREFIX_MAP: Record<string, { state: string; days: string }> = {
  // Northern Region
  "11": { state: "Delhi", days: "2-3" },
  "12": { state: "Haryana", days: "2-4" },
  "13": { state: "Haryana / Punjab", days: "2-4" },
  "14": { state: "Punjab", days: "2-4" },
  "15": { state: "Punjab", days: "3-4" },
  "16": { state: "Chandigarh / Punjab", days: "2-4" },
  "17": { state: "Himachal Pradesh", days: "3-5" },
  "18": { state: "Jammu & Kashmir", days: "4-6" },
  "19": { state: "Jammu & Kashmir", days: "4-6" },
  "20": { state: "Uttar Pradesh", days: "2-4" },
  "21": { state: "Uttar Pradesh", days: "2-4" },
  "22": { state: "Uttar Pradesh", days: "2-4" },
  "23": { state: "Uttar Pradesh", days: "3-4" },
  "24": { state: "Uttarakhand / UP", days: "3-5" },
  "25": { state: "Uttar Pradesh", days: "2-4" },
  "26": { state: "Uttarakhand / UP", days: "3-5" },
  "27": { state: "Uttar Pradesh", days: "3-5" },
  "28": { state: "Uttar Pradesh", days: "3-4" },
  // Western Region
  "30": { state: "Rajasthan", days: "2-4" },
  "31": { state: "Rajasthan", days: "3-4" },
  "32": { state: "Rajasthan", days: "3-4" },
  "33": { state: "Rajasthan", days: "3-5" },
  "34": { state: "Rajasthan", days: "3-5" },
  "36": { state: "Gujarat", days: "2-4" },
  "37": { state: "Gujarat", days: "3-4" },
  "38": { state: "Gujarat", days: "2-3" },
  "39": { state: "Gujarat", days: "2-3" },
  "40": { state: "Maharashtra / Goa", days: "1-3" },
  "41": { state: "Maharashtra", days: "2-3" },
  "42": { state: "Maharashtra", days: "2-3" },
  "43": { state: "Maharashtra", days: "2-4" },
  "44": { state: "Maharashtra", days: "2-4" },
  // Central Region
  "45": { state: "Madhya Pradesh", days: "2-4" },
  "46": { state: "Madhya Pradesh", days: "2-4" },
  "47": { state: "Madhya Pradesh", days: "3-4" },
  "48": { state: "Madhya Pradesh", days: "3-5" },
  "49": { state: "Chhattisgarh", days: "3-5" },
  // Southern Region
  "50": { state: "Telangana", days: "2-4" },
  "51": { state: "Andhra Pradesh", days: "2-4" },
  "52": { state: "Andhra Pradesh", days: "2-4" },
  "53": { state: "Andhra Pradesh", days: "3-4" },
  "56": { state: "Karnataka", days: "2-4" },
  "57": { state: "Karnataka", days: "3-4" },
  "58": { state: "Karnataka", days: "3-5" },
  "59": { state: "Karnataka", days: "3-5" },
  "60": { state: "Tamil Nadu", days: "2-4" },
  "61": { state: "Tamil Nadu", days: "2-4" },
  "62": { state: "Tamil Nadu", days: "3-4" },
  "63": { state: "Tamil Nadu", days: "3-4" },
  "64": { state: "Tamil Nadu", days: "2-4" },
  "67": { state: "Kerala", days: "3-5" },
  "68": { state: "Kerala", days: "3-5" },
  "69": { state: "Kerala", days: "3-5" },
  // Eastern Region
  "70": { state: "West Bengal", days: "2-4" },
  "71": { state: "West Bengal", days: "3-4" },
  "72": { state: "West Bengal", days: "3-4" },
  "73": { state: "West Bengal", days: "3-5" },
  "74": { state: "West Bengal", days: "3-5" },
  "75": { state: "Odisha", days: "3-5" },
  "76": { state: "Odisha", days: "3-5" },
  "77": { state: "Odisha", days: "3-5" },
  "78": { state: "Assam", days: "4-6" },
  "79": { state: "North Eastern States", days: "4-7" },
  "80": { state: "Bihar", days: "3-5" },
  "81": { state: "Bihar / Jharkhand", days: "3-5" },
  "82": { state: "Jharkhand", days: "3-5" },
  "83": { state: "Jharkhand", days: "3-5" },
  "84": { state: "Bihar", days: "3-5" },
  "85": { state: "Bihar", days: "3-5" },
};

const DUMMY_PINCODES = new Set([
  "000000",
  "111111",
  "222222",
  "333333",
  "444444",
  "555555",
  "666666",
  "777777",
  "888888",
  "999999",
  "123456",
  "654321",
  "012345",
]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pin = (searchParams.get("pincode") || "").trim();

  // Basic format validation: exactly 6 digits, first digit 1-8
  if (!/^[1-8]\d{5}$/.test(pin)) {
    return NextResponse.json(
      {
        available: false,
        message: pin.startsWith("0")
          ? "Invalid pincode: Indian pincodes cannot start with 0."
          : "Invalid pincode: Please enter a valid 6-digit Indian pincode.",
      },
      { status: 200 }
    );
  }

  // Reject dummy pincodes
  if (DUMMY_PINCODES.has(pin)) {
    return NextResponse.json(
      {
        available: false,
        message: `Pincode ${pin} is invalid and not serviceable.`,
      },
      { status: 200 }
    );
  }

  const prefix = pin.slice(0, 2);
  const regionInfo = VALID_PIN_PREFIX_MAP[prefix];

  if (!regionInfo) {
    return NextResponse.json(
      {
        available: false,
        message: `Pincode ${pin} is not serviceable. Please check and try again.`,
      },
      { status: 200 }
    );
  }

  // Try official India Post API with 2.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const postResponse = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {
      signal: controller.signal,
      headers: { "User-Agent": "DesignersWatch-Checker/1.0" },
      next: { revalidate: 86400 }, // Cache lookup for 24h
    });
    clearTimeout(timeoutId);

    if (postResponse.ok) {
      const data = await postResponse.json();
      if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const district = po.District || regionInfo.state;
        const state = po.State || regionInfo.state;
        const days = regionInfo.days;

        return NextResponse.json({
          available: true,
          pincode: pin,
          location: `${district}, ${state}`,
          district,
          state,
          days,
          message: `Delivery available in ${district}, ${state} (${days} business days). Cash on Delivery & Prepaid available.`,
        });
      } else if (Array.isArray(data) && data[0]?.Status === "Error") {
        return NextResponse.json({
          available: false,
          pincode: pin,
          message: `Delivery is not serviceable for pincode ${pin}. Please enter a valid postal code.`,
        });
      }
    }
  } catch {
    // In case postalpincode.in is down or times out, fall back to region prefix validation
  }

  // Fallback to regionInfo
  return NextResponse.json({
    available: true,
    pincode: pin,
    location: regionInfo.state,
    state: regionInfo.state,
    days: regionInfo.days,
    message: `Delivery available in ${regionInfo.state} (${regionInfo.days} business days). Free Express Shipping available.`,
  });
}
