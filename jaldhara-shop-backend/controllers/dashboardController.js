const Daily = require("../models/DailySales");
const Monthly = require("../models/MonthlySales");
const Category = require("../models/CategorySales");

// UPDATE Daily Sales
exports.updateDailySales = async (date, totalSales, orders) => {
  await Daily.findOneAndUpdate(
    { date },
    { date, totalSales, orders },
    { upsert: true }
  );
};

// UPDATE Monthly Sales
exports.updateMonthlySales = async (month, revenue) => {
  await Monthly.findOneAndUpdate(
    { month },
    { month, revenue },
    { upsert: true }
  );
};

// UPDATE Category Sales
exports.updateCategorySales = async (category, revenue) => {
  await Category.findOneAndUpdate(
    { category },
    { category, revenue },
    { upsert: true }
  );
};
