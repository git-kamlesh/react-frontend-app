import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LayoutDashboard, Settings, Bell, User, TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';
import { selectCount, increment, decrement, reset } from './store/counterSlice.js';

const kpiCards = [
  { label: 'Total Users', value: '24,521', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Revenue', value: '$148,320', change: '+8.2%', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Orders', value: '3,842', change: '+5.1%', icon: ShoppingCart, color: 'bg-purple-50 text-purple-600' },
  { label: 'Active Sessions', value: '1,290', change: '+3.4%', icon: Activity, color: 'bg-orange-50 text-orange-600' },
];

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-semibold text-gray-900">Enterprise Portal</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
        <Link to="/settings" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Settings</Link>
      </nav>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Profile">
          <User className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
}

function KpiCard({ label, value, change, icon: Icon, color }) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        <p className="text-xs text-green-600 font-medium mt-1">{change} vs last month</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back — here's what's happening today.</p>
      </div>

      {/* KPI Grid */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      {/* Redux Counter Demo */}
      <section className="card max-w-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Redux Counter (KAN-8 Demo)</h2>
        <p className="text-5xl font-bold text-blue-600 text-center py-4">{count}</p>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={() => dispatch(decrement())} className="btn-primary flex-1 justify-center bg-gray-200 text-gray-700 hover:bg-gray-300">−</button>
          <button onClick={() => dispatch(increment())} className="btn-primary flex-1 justify-center">+</button>
          <button onClick={() => dispatch(reset())} className="btn-primary flex-1 justify-center bg-red-100 text-red-700 hover:bg-red-200">Reset</button>
        </div>
      </section>
    </main>
  );
}

function SettingsPage() {
  return (
    <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-gray-500" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      <div className="card max-w-lg">
        <p className="text-sm text-gray-500">Application settings will be configured here.</p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}
