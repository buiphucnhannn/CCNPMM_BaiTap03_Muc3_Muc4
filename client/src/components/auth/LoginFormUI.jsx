import { useState } from 'react';
import AppCard from '../ui/AppCard';
import AppButton from '../ui/AppButton';
import InputField from '../ui/InputField';
import FormAlert from '../ui/FormAlert';

export default function LoginFormUI({ form, loading, errorMessage, successMessage, onFieldChange, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const alertType = errorMessage ? 'error' : successMessage ? 'success' : '';
  const alertMessage = errorMessage || successMessage || '';

  return (
    <AppCard
      title={'\u0110\u0103ng nh\u1EADp'}
      subtitle={'Nh\u1EADp th\u00F4ng tin t\u00E0i kho\u1EA3n \u0111\u1EC3 ti\u1EBFp t\u1EE5c'}
    >
      <FormAlert type={alertType} message={alertMessage} />

      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => onFieldChange('email', event.target.value)}
          placeholder="youremail@example.com"
          required
          disabled={loading}
        />

        <InputField
          label={'M\u1EADt kh\u1EA9u'}
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={(event) => onFieldChange('password', event.target.value)}
          placeholder={'Nh\u1EADp m\u1EADt kh\u1EA9u'}
          required
          disabled={loading}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              aria-label={showPassword ? '\u1EA8n m\u1EADt kh\u1EA9u' : 'Hi\u1EC7n m\u1EADt kh\u1EA9u'}
            >
              {showPassword ? '\u1EA8n' : 'Hi\u1EC7n'}
            </button>
          }
        />

        <AppButton type="submit" fullWidth disabled={loading}>
          {loading ? '\u0110ang \u0111\u0103ng nh\u1EADp...' : '\u0110\u0103ng nh\u1EADp'}
        </AppButton>
      </form>
    </AppCard>
  );
}

