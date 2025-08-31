import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext, useState , useEffect} from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

function DashboardPieCharts() {
  const [categoryData, setCategoryData] = useState([]);
  const [orderTypeData, setOrderTypeData] = useState([]);
  const {url} = useContext(ShopContext);
  

  useEffect(() => {
  const fetchCategorySales = async () => {
    try {
      const { data } = await axios.get(`${url}/api/order/get-category-sales`);
      setCategoryData(data.data);
    } catch (err) {
      console.error("Error fetching category sales", err);
    }
  };

  const fetchOrderTypeDistribution = async () => {
    try {
      const { data } = await axios.get(`${url}/api/order/get-order-type-distribution`);
      setOrderTypeData(data.data);
    } catch (err) {
      console.error("Error fetching order type distribution", err);
    }
  };

  fetchCategorySales();
  fetchOrderTypeDistribution();
}, [url]);

  // Colors for charts
  const COLORS_CATEGORY = ["#16a34a", "#dc2626", "#d97706", "#2563eb"]; // green, red, amber, blue
  const COLORS_ORDER = ["#dc2626", "#2563eb", "#ec4899"]; // red, blue, pink

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Pie Chart 1 - Category Sales */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Sold Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_CATEGORY[index % COLORS_CATEGORY.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart 2 - Order Type */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Type Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderTypeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {orderTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_ORDER[index % COLORS_ORDER.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardPieCharts;
