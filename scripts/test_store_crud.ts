import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function runTests() {
  console.log("=== Starting Store CRUD Verification Tests ===");

  // 1. Check initial stores count
  const initialStores = await (prisma as any).store.findMany({ where: { isActive: true } });
  console.log(`Initial active stores: ${initialStores.length}`);

  // 2. Create a new test store
  const testId = `test-store-${Date.now()}`;
  console.log(`Creating test store with id: ${testId}`);
  const created = await (prisma as any).store.create({
    data: {
      id: testId,
      name: "TEST LUXURY BOUTIQUE",
      contactPerson: "Raj Sharma",
      phone: "+91 99999 88888",
      email: "test@luxuryboutique.com",
      brands: ["D'Signer Watches", "Escort Watches"],
      category: "D'Signer Exclusive",
      address: "123 Galleria Mall, MG Road",
      area: "Connaught Place",
      city: "NEW DELHI",
      state: "DELHI",
      location: "DELHI OFFICE",
      latitude: 28.6315,
      longitude: 77.2167,
      googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Connaught%20Place",
      isActive: true,
      sortOrder: 999
    }
  });
  console.log("Store created successfully:", created.name, created.id);

  // 3. Find created store
  const found = await (prisma as any).store.findUnique({ where: { id: testId } });
  if (!found || found.name !== "TEST LUXURY BOUTIQUE") {
    throw new Error("Created store could not be found!");
  }
  console.log("Store verified via findUnique:", found.name);

  // 4. Update store
  console.log("Updating store name and city...");
  const updated = await (prisma as any).store.update({
    where: { id: testId },
    data: {
      name: "UPDATED LUXURY BOUTIQUE",
      city: "MUMBAI"
    }
  });
  console.log("Store updated:", updated.name, updated.city);

  // 5. Deactivate store
  console.log("Deactivating store...");
  const deactivated = await (prisma as any).store.update({
    where: { id: testId },
    data: {
      isActive: false
    }
  });
  console.log("Store deactivated, isActive:", deactivated.isActive);

  // 6. Verify it is not in active stores
  const activeAfterDeactivate = await (prisma as any).store.findMany({ where: { isActive: true } });
  const isFoundInActive = activeAfterDeactivate.some((s: any) => s.id === testId);
  console.log("Is deactivated store in active list?", isFoundInActive ? "FAIL" : "PASS (Excluded as expected)");

  // 7. Reactivate store
  console.log("Reactivating store...");
  const reactivated = await (prisma as any).store.update({
    where: { id: testId },
    data: {
      isActive: true
    }
  });
  console.log("Store reactivated, isActive:", reactivated.isActive);

  // 8. Delete the test store
  console.log("Cleaning up test store...");
  await (prisma as any).store.delete({ where: { id: testId } });
  const afterDelete = await (prisma as any).store.findUnique({ where: { id: testId } });
  console.log("Store after deletion:", afterDelete ? "FAIL" : "PASS (Deleted successfully)");

  const finalStores = await (prisma as any).store.findMany({ where: { isActive: true } });
  console.log(`Final active stores count: ${finalStores.length}`);

  if (finalStores.length === initialStores.length) {
    console.log("=== ALL STORE CRUD TESTS PASSED PERFECTLY ===");
  } else {
    throw new Error(`Count mismatch: expected ${initialStores.length}, got ${finalStores.length}`);
  }
}

runTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
