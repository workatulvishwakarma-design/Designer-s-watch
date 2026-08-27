const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'DEALER MASTER.xlsx');
if (!fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

const workbook = xlsx.readFile(filePath);

function cleanText(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/\s+/g, ' ').trim();
}

function cleanPhone(p) {
  if (!p) return '';
  let str = cleanText(p);
  str = str.replace(/\.0$/, '');
  return str;
}

function cleanContactPerson(name) {
  if (!name) return '';
  let n = cleanText(name).toUpperCase();
  if (['SHOP', '0', '-', 'NIL', 'NA', 'NONE'].includes(n)) return '';
  n = n.replace(/\b(BHAI|JI|BHAIYA|SAHAB|SIR|SETH|SETT)\b/gi, '');
  n = n.replace(/^(MR\.?|MS\.?|MRS\.?|SHREE|SHRI)\s+/gi, '');
  return cleanText(n);
}

const MUMBAI_AREAS = [
  'DADAR', 'BORIVALI', 'ANDHERI', 'MALAD', 'SANTACRUZ', 'SANTACRAZ',
  'GRANT ROAD', 'PAREL', 'GHATKOPAR', 'MULUND', 'MULUD', 'THANE',
  'MIRA ROAD', 'MIRA ROAD E', 'BHAYANDER', 'BHAYANDER W', 'VASAI',
  'VASAI WEST', 'NALLASOPARA', 'NALLASOPARA EAST', 'NALLASOPARA WEST',
  'BANDRA', 'KURLA', 'CHEMBUR', 'KANDIVALI', 'GOREGAON', 'VIKHROLI',
  'BHANDUP', 'KALYAN', 'DOMBIVLI', 'NAVI MUMBAI', 'VASHI', 'NERUL',
  'KHARGHAR', 'PANVEL', 'CHURCHGATE', 'CST', 'FORT', 'COLABA'
];

function extractCityAreaState(rawCity, rawArea, rawState, partyName, address) {
  let c = cleanText(rawCity).toUpperCase().replace(/[()]/g, '').trim();
  let a = cleanText(rawArea).toUpperCase().replace(/[()]/g, '').trim();
  let st = cleanText(rawState).toUpperCase();
  const p = cleanText(partyName).toUpperCase();
  const addr = cleanText(address).toUpperCase();

  // Check party name parens e.g. 'ETERNITY (DADAR)' or 'ASHOK WATCH COMPANY(BHILAI)'
  const parenMatch = partyName.match(/\((.*?)\)/);
  if (parenMatch) {
    const cand = parenMatch[1].toUpperCase().trim();
    if (MUMBAI_AREAS.includes(cand) || MUMBAI_AREAS.some(m => cand.startsWith(m))) {
      a = cand;
      c = 'MUMBAI';
      st = 'MAHARASHTRA';
    } else if (cand.includes('SURAT')) {
      c = 'SURAT';
      st = 'GUJARAT';
      a = cand.replace('SURAT', '').trim();
    } else if (cand.includes('BHILAI')) {
      c = 'BHILAI';
      st = 'CHHATTISGARH';
    } else if (cand.includes('ALLIBAUG') || cand.includes('ALIBAUG')) {
      c = 'ALIBAUG';
      st = 'MAHARASHTRA';
    } else if (cand.includes('PEN')) {
      c = 'PEN';
      st = 'MAHARASHTRA';
    } else if (cand.includes('KHOPOLI')) {
      c = 'KHOPOLI';
      st = 'MAHARASHTRA';
    }
  }

  // Check raw city for Mumbai areas
  for (const m of MUMBAI_AREAS) {
    if (c.includes(m) || (c && m.startsWith(c) && c.length >= 4)) {
      a = a || c;
      c = 'MUMBAI';
      st = 'MAHARASHTRA';
      break;
    }
  }

  // Check Surat areas
  if (c.includes('SURAT') || a.includes('SURAT') || p.includes('SURAT')) {
    if (c !== 'SURAT' && !a) {
      a = c.replace('SURAT', '').trim();
    }
    c = 'SURAT';
    st = 'GUJARAT';
  }

  // Check Pune areas
  if (c.includes('PUNE') || a.includes('PUNE') || p.includes('PUNE')) {
    if (c !== 'PUNE' && !a) {
      a = c.replace('PUNE', '').trim();
    }
    c = 'PUNE';
    st = 'MAHARASHTRA';
  }

  // Check Coimbatore areas
  if (c.includes('COIMBATORE') || a.includes('COIMBATORE') || p.includes('COIMBATORE')) {
    if (c !== 'COIMBATORE' && !a) {
      a = c.replace('COIMBATORE', '').trim();
    }
    c = 'COIMBATORE';
    st = 'TAMIL NADU';
  }

  // Check Vapi areas
  if (c.includes('VAPI') || a.includes('VAPI') || p.includes('VAPI')) {
    if (c !== 'VAPI' && !a) {
      a = c.replace('VAPI', '').trim();
    }
    c = 'VAPI';
    st = 'GUJARAT';
  }

  // Specific city fixes
  if (c === 'AHEMDABAD') { c = 'AHMEDABAD'; st = 'GUJARAT'; }
  if (c === 'PANCHUKLA') { c = 'PANCHKULA'; st = 'HARYANA'; }
  if (c === 'BHATINDA') { c = 'BATHINDA'; st = 'PUNJAB'; }
  if (c === 'MORADABAD') st = 'UTTAR PRADESH';
  if (c === 'AMRITSAR') st = 'PUNJAB';
  if (c === 'JALANDHAR') st = 'PUNJAB';
  if (c === 'LUDHIANA') st = 'PUNJAB';
  if (c === 'KANPUR') st = 'UTTAR PRADESH';
  if (c === 'LUCKNOW') st = 'UTTAR PRADESH';
  if (c === 'VARANASI') st = 'UTTAR PRADESH';
  if (c === 'AGRA') st = 'UTTAR PRADESH';
  if (c === 'ALIGARH') st = 'UTTAR PRADESH';
  if (c === 'MEERUTH' || c === 'MEERUT') { c = 'MEERUT'; st = 'UTTAR PRADESH'; }
  if (c === 'MAWANA') st = 'UTTAR PRADESH';
  if (c === 'MUZAFFARNAGAR') st = 'UTTAR PRADESH';
  if (c === 'BAREILLY') st = 'UTTAR PRADESH';
  if (c === 'BALRAMPUR') st = 'UTTAR PRADESH';
  if (c === 'SITAPUR') st = 'UTTAR PRADESH';
  if (c === 'RAMPUR') st = 'UTTAR PRADESH';
  if (c === 'SAHARANPUR') st = 'UTTAR PRADESH';
  if (c === 'ROORKEE') st = 'UTTARAKHAND';
  if (c === 'DEHRADUN') st = 'UTTARAKHAND';
  if (c === 'ALLAHABAD' || c === 'PRAYAGRAJ') { c = 'PRAYAGRAJ (ALLAHABAD)'; st = 'UTTAR PRADESH'; }
  if (c === 'DELHI' || c === 'NEW DELHI') { c = 'DELHI'; st = 'DELHI'; }
  if (c === 'NOIDA') { c = 'NOIDA'; st = 'UTTAR PRADESH'; }
  if (c === 'GHAZIABAD') { c = 'GHAZIABAD'; st = 'UTTAR PRADESH'; }
  if (c === 'GURUGRAM' || c === 'GURGAON') { c = 'GURUGRAM'; st = 'HARYANA'; }
  if (c === 'PANIPAT') st = 'HARYANA';
  if (c === 'ROHTAK') st = 'HARYANA';
  if (c === 'AMBALA') st = 'HARYANA';
  if (c === 'SIRSA') st = 'HARYANA';
  if (c === 'KURUKSHETRA' || c === 'Kurukshetra') { c = 'KURUKSHETRA'; st = 'HARYANA'; }
  if (c === 'BHADURGARH' || c === 'Bhadurgarh') { c = 'BAHADURGARH'; st = 'HARYANA'; }
  if (c === 'HYDERABAD' || c === 'HYADRABAD') { c = 'HYDERABAD'; st = 'TELANGANA'; }
  if (c === 'BANGALORE' || c === 'BENGALURU') { c = 'BANGALORE'; st = 'KARNATAKA'; }
  if (c === 'CHENNAI' || c === 'MADRAS') { c = 'CHENNAI'; st = 'TAMIL NADU'; }
  if (c === 'KOLKATTA' || c === 'KOLKATA') { c = 'KOLKATA'; st = 'WEST BENGAL'; }
  if (c === 'VADODARA' || c === 'VADODRA' || c === 'BARODA') { c = 'VADODARA'; st = 'GUJARAT'; }
  if (c === 'VALSAD') st = 'GUJARAT';
  if (c === 'SOLAPUR' || c === 'SHOLAPUR') { c = 'SOLAPUR'; st = 'MAHARASHTRA'; }
  if (c === 'FORUM MALL KERLA') { c = 'KOCHI'; a = 'FORUM MALL'; st = 'KERALA'; }
  if (c === 'DWARKA') { c = 'DELHI'; a = 'DWARKA'; st = 'DELHI'; }

  // Fallbacks from address or party name if city missing
  if (!c || c === '0') {
    if (a === 'ALIGANJ' || addr.includes('LUCKNOW')) {
      c = 'LUCKNOW';
      st = 'UTTAR PRADESH';
    } else if (p.includes('MULUND') || addr.includes('MUMBAI') || addr.includes('KALYAN')) {
      c = 'MUMBAI';
      st = 'MAHARASHTRA';
      if (addr.includes('KALYAN')) a = a || 'KALYAN';
      if (p.includes('MULUND')) a = a || 'MULUND';
    } else if (addr.includes('BHATINDA') || addr.includes('BATHINDA')) {
      c = 'BATHINDA';
      st = 'PUNJAB';
    }
  }

  // Clean state
  if (st === 'GUJRAT' || st === 'GUJARAT') st = 'GUJARAT';
  else if (st === 'MAHARASTRA' || st === 'MAHARASHTRA') st = 'MAHARASHTRA';
  else if (st === 'UTTARPRADESH' || st === 'UTTAR PRADESH') st = 'UTTAR PRADESH';
  else if (st === 'TAMILNADU' || st === 'TAMIL NADU') st = 'TAMIL NADU';
  else if (st === 'KOLKATTA' || st === 'KOLKATA' || st === 'WEST BENGAL') st = 'WEST BENGAL';
  else if (st === 'TELANGANA') st = 'TELANGANA';
  else if (st === 'DELHI') st = 'DELHI';
  else if (st === 'PUNJAB') st = 'PUNJAB';
  else if (st === 'HARYANA') st = 'HARYANA';
  else if (st === 'KARNATAKA') st = 'KARNATAKA';
  else if (st === 'KERALA') st = 'KERALA';
  else if (st === 'JAMMU & KASHMIR' || st === 'JAMMU' || st === 'KASHMIR') st = 'JAMMU & KASHMIR';
  else if (st === 'UTTARAKHAND' || st === 'UTTRANCHAL') st = 'UTTARAKHAND';
  else if (st === 'CHHATTISGARH') st = 'CHHATTISGARH';

  return { city: c, area: a, state: st };
}

const dealersMap = new Map();
let dealerIdCounter = 1;

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  for (const r of rows) {
    const partyName = cleanText(r['PARTY NAME']);
    if (!partyName || partyName.toUpperCase() === 'PARTY NAME') continue;

    const rawPhone = cleanPhone(r['CONTACT NUMBER']);
    const rawContact = cleanContactPerson(r['CONTACT PERSOM '] || r['CONTACT PERSON']);
    const rawCity = r['CITY'];
    const rawArea = r['AREA'] || '';
    const rawState = r['STATE'];
    const email = cleanText(r['E MAIL ID'] || r['EMAIL'] || '');
    const location = cleanText(r['LOCATION '] || r['LOCATION'] || '');
    const address = cleanText(r['ADDRESS'] || '');
    const addressStatus = cleanText(r['ADDRESS STATUS'] || '');

    const { city, area, state } = extractCityAreaState(rawCity, rawArea, rawState, partyName, address);

    let brands = [];
    if (sheetName === 'ESCORT') {
      brands = ['Escort Watches'];
    } else if (sheetName === 'DESIGNER') {
      brands = ["D'Signer Watches"];
    } else if (sheetName === 'ganesh') {
      const escortVal = cleanText(r['ESCORT']);
      const designerVal = cleanText(r['DESIGNER']);
      if (designerVal && designerVal !== '-') brands.push("D'Signer Watches");
      if (escortVal && escortVal !== '-') brands.push('Escort Watches');
      if (brands.length === 0) brands = ["D'Signer Watches", 'Escort Watches'];
    } else if (sheetName === 'BHARATH CHAVAN') {
      brands = ['Escort Watches'];
    }

    const key = `${partyName.toUpperCase()}|${city.toUpperCase()}|${area.toUpperCase()}`;

    if (!dealersMap.has(key)) {
      dealersMap.set(key, {
        id: `dlr-${dealerIdCounter++}`,
        name: partyName,
        contactPerson: rawContact,
        phone: rawPhone,
        email: email,
        brands: brands,
        area: area,
        city: city,
        state: state,
        location: location || (state ? `${state} Region` : 'Official Retail Network'),
        address: address,
        addressStatus: addressStatus,
        tabs: [sheetName]
      });
    } else {
      const existing = dealersMap.get(key);
      for (const b of brands) {
        if (!existing.brands.includes(b)) existing.brands.push(b);
      }
      if (!existing.contactPerson && rawContact) existing.contactPerson = rawContact;
      if (!existing.phone && rawPhone) existing.phone = rawPhone;
      if (!existing.email && email) existing.email = email;
      if (!existing.address && address) existing.address = address;
      if (!existing.addressStatus && addressStatus) existing.addressStatus = addressStatus;
      if (!existing.area && area) existing.area = area;
      if (!existing.tabs.includes(sheetName)) existing.tabs.push(sheetName);
    }
  }
}

const dealerList = Array.from(dealersMap.values());

for (const d of dealerList) {
  // Enhanced Google Maps query
  let queryText = '';
  const isVerifiedAddress = d.address && 
    !d.address.toLowerCase().includes('not confidently') && 
    !d.address.toLowerCase().includes('verify manually');

  if (isVerifiedAddress) {
    queryText = `${d.name}, ${d.address}`;
  } else {
    const parts = [d.name, d.area, d.city, d.state, 'India'].filter(Boolean);
    queryText = parts.join(', ');
  }

  d.googleMapsQuery = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;
  d.searchIndex = `${d.name} ${d.city} ${d.state} ${d.area} ${d.address} ${d.contactPerson} ${d.phone} ${d.email} ${d.brands.join(' ')}`.toLowerCase();
}

console.log('Total extracted dealers:', dealerList.length);
const brandCounts = {};
for (const d of dealerList) {
  for (const b of d.brands) brandCounts[b] = (brandCounts[b] || 0) + 1;
}
console.log('Brand breakdown:', brandCounts);

const verifiedCount = dealerList.filter(d => d.address && !d.address.toLowerCase().includes('not confidently') && !d.address.toLowerCase().includes('verify manually')).length;
console.log('Verified addresses count:', verifiedCount);

fs.writeFileSync('src/data/dealers.json', JSON.stringify(dealerList, null, 2), 'utf8');
console.log('Successfully wrote to src/data/dealers.json');
