import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppCard from '../../components/ui/AppCard';
import apiClient from '../../lib/apiClient';

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/user/profile');
        if (!isMounted) return;
        setUser(response.data.user || null);
        setMessage(response.data.message || 'Lấy profile thành công.');
      } catch (error) {
        if (!isMounted) return;
        setMessage(error?.response?.data?.message || 'Không thể tải profile người dùng.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppCard title={'Trang người dùng'}>
      {loading ? (
        <p className="text-sm text-slate-700">Đang tải thông tin profile...</p>
      ) : (
        <>
          <p className="text-sm text-slate-700">{message}</p>
          {user && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <p><span className="font-semibold">Họ tên:</span> {user.fullName}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Vai trò:</span> {user.role}</p>
            </div>
          )}
        </>
      )}

      <Link to="/auth/login" className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
        {'Quay lại trang đăng nhập'}
      </Link>
    </AppCard>
  );
}
