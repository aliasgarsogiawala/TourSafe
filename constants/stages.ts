export const stages = [
  {
    step: "Donation Received",
    status: "Completed",
    date: "March 15, 2024",
    authority: "SureShare Foundation",
    items: [
      {
        name: "Medical Supplies",
        quantity: "500 units",
        status: "Ready for Distribution"
      },
      {
        name: "Food Packages",
        quantity: "1000 packages",
        status: "Ready for Distribution"
      },
      {
        name: "Water Purifiers",
        quantity: "200 units",
        status: "Ready for Distribution"
      }
    ]
  },
  {
    step: "Verification & Sorting",
    status: "Completed",
    date: "March 18, 2024",
    authority: "Distribution Center",
    items: [
      {
        name: "Medical Supplies",
        quantity: "500 units",
        status: "Verified"
      },
      {
        name: "Food Packages",
        quantity: "1000 packages",
        status: "Sorted"
      },
      {
        name: "Water Purifiers",
        quantity: "200 units",
        status: "Verified"
      }
    ]
  },
  {
    step: "In Transit",
    status: "In Progress",
    expected: "Expected Arrival: March 25, 2024",
    contact: "Contact: logistics@sureshare.org",
    items: [
      {
        name: "Medical Supplies",
        quantity: "500 units",
        status: "In Transit"
      },
      {
        name: "Food Packages",
        quantity: "1000 packages",
        status: "In Transit"
      },
      {
        name: "Water Purifiers",
        quantity: "200 units",
        status: "In Transit"
      }
    ]
  }
];