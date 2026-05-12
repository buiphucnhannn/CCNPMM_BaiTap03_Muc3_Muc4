import { Link } from 'react-router-dom';
import AppCard from '../../components/ui/AppCard';

export default function UserProfilePage() {
  return (
    <AppCard title={'Trang ng\u01B0\u1EDDi d\u00F9ng'}>
      <p className="text-sm text-slate-700">{'B\u1EA1n \u0111\u00E3 \u0111\u0103ng nh\u1EADp v\u1EDBi t\u00E0i kho\u1EA3n ng\u01B0\u1EDDi d\u00F9ng.'}</p>
      <Link to="/auth/login" className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
        {'Quay l\u1EA1i trang \u0111\u0103ng nh\u1EADp'}
      </Link>
    </AppCard>
  );
}

