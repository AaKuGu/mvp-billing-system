// import mongoose from "mongoose";

// // Subdocument schema for line items (matches your ItemsTable data)
// const itemSchema = new mongoose.Schema(
//   {
//     item_name: {
//       type: String,
//       required: true,
//     },
//     item_description: String,
//     quantity: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     rate: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//   },
//   { _id: true }
// );

// const billSchema = new mongoose.Schema(
//   {
//     // Core identification
//     bill_number: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     // References
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },
//     customer_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//     },

//     // Business details (snapshot for historical accuracy)
//     business_details: {
//       businessName: {
//         type: String,
//         required: true,
//       },
//       businessTagline: String,
//       businessDescription: String,
//       gstNumber: String,
//       businessAddress: String,
//       businessEmail: String,
//       businessContactNo: String,
//     },

//     // Customer details (snapshot for historical accuracy)
//     customer_details: {
//       customer_name: {
//         type: String,
//         required: true,
//       },
//       whatsapp_num: String,
//       customer_address_area: String,
//     },

//     // Line items
//     item_details: {
//       type: [itemSchema],
//       required: true,
//       validate: [(array) => array.length > 0, "At least one item is required"],
//     },

//     // Pricing breakdown (matches your component structure)
//     pricing_details: {
//       price_before_discount: {
//         type: Number,
//         required: true,
//         min: 0,
//       },
//       discount: {
//         type: Number,
//         default: 0,
//         min: 0,
//       },
//       price_after_discount: {
//         type: Number,
//         required: true,
//         min: 0,
//       },
//       gst_percent: {
//         type: Number,
//         default: 0,
//         min: 0,
//       },
//       gst_amount: {
//         type: Number,
//         default: 0,
//         min: 0,
//       },
//       price_after_gst: {
//         type: Number,
//         default: 0,
//         min: 0,
//       },
//       round_off: {
//         type: Number,
//         default: 0,
//       },
//       grand_total: {
//         type: Number,
//         required: true,
//         min: 0,
//       },
//       currency: {
//         type: String,
//         default: "INR",
//       },
//     },

//     // Reference fields for external systems or custom tracking
//     user_reference: String, // Custom reference set by the user
//     customer_reference: String, // PO number or customer's reference

//     // Bill metadata
//     status: {
//       type: String,
//       enum: ["draft", "sent", "paid", "overdue", "cancelled"],
//       default: "draft",
//     },
//     issue_date: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//     due_date: Date,
//     paid_date: Date,

//     // Notes and terms
//     notes: String,
//     terms: String,

//     // Legacy/convenience field for full bill data
//     stringifiedBill: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// billSchema.index({ user_id: 1 });

// export default mongoose.models.Bill || mongoose.model("Bill", billSchema);

import mongoose from "mongoose";

// Subdocument schema for line items (matches your ItemsTable component)
const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unitName: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const billSchema = new mongoose.Schema(
  {
    // Core identification
    bill_number: {
      type: String,
      required: true,
      unique: true,
    },

    // References
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    // Business details (snapshot for historical accuracy)
    business_details: {
      businessName: {
        type: String,
        required: true,
      },
      businessTagline: String,
      businessDescription: String,
      gstNumber: String,
      businessAddress: String,
      businessEmail: String,
      businessContactNo: String,
    },

    // Customer details (snapshot for historical accuracy)
    customer_details: {
      customer_name: {
        type: String,
        required: true,
      },
      whatsapp_num: String,
      customer_address_area: String,
    },

    // Line items
    item_details: {
      type: [itemSchema],
      required: true,
      validate: [(array) => array.length > 0, "At least one item is required"],
    },

    // Pricing breakdown (matches your component structure)
    pricing_details: {
      price_before_discount: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
      },
      price_after_discount: {
        type: Number,
        required: true,
        min: 0,
      },
      gst_percent: {
        type: Number,
        default: 0,
        min: 0,
      },
      gst_amount: {
        type: Number,
        default: 0,
        min: 0,
      },
      price_after_gst: {
        type: Number,
        default: 0,
        min: 0,
      },
      round_off: {
        type: Number,
        default: 0,
      },
      grand_total: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for common queries
billSchema.index({ user_id: 1 });

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);
