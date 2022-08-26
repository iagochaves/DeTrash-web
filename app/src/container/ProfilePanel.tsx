import { useUser } from '@auth0/nextjs-auth0';
import classNames from 'classnames';
import { Form, FormikProps } from 'formik';
import Image from 'next/image';
import * as R from 'ramda';
import { useEffect } from 'react';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import { MeQuery } from '../graphql/generated/graphql';
import { USER_ROLE_TYPES } from '../utils/constants';
import { ProfileFormSchema } from '../utils/YupSchema';

interface ProfilePanelProps extends FormikProps<ProfileFormSchema> {
  data: MeQuery | undefined;
  isUpdatingUser: boolean;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  data,
  errors,
  isUpdatingUser,
  setFieldValue,
  setFieldTouched,
  values,
}) => {
  const { user } = useUser();

  useEffect(() => {
    if (data?.me) {
      const { email, name, phoneNumber, profileType } = data.me;
      setFieldValue('email', email);
      setFieldValue('name', name);
      setFieldValue('phoneNumber', phoneNumber);
      setFieldValue('profileType', profileType);
      setTimeout(() => {
        setFieldTouched('name', true);
      }, 1);
    }
  }, [data, setFieldTouched, setFieldValue]);

  return (
    <Form className="flex flex-col flex-1 gap-4 sm:gap-12">
      <section>
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          Profile settings
        </h2>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          BASIC INFO:
        </h2>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <Input
              label="Preferred Name"
              name="name"
              placeholder="Type your name"
              required
            />
          </div>
          <div className="col-span-3">
            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="Type your phone number"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-4">
            <Input
              label="Email"
              name="email"
              disabled
              placeholder="Type your phone number"
            />
          </div>
          <div className="col-span-6">
            <p className="mb-2 text-sm font-medium text-gray-700">Photo</p>
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring-[1px] ring-neutral relative">
                {user?.picture && (
                  <Image src={user.picture} alt="User profile" layout="fill" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          PROFILE TYPE:
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {USER_ROLE_TYPES.map((userType) => (
            <Radio
              isDisabled={userType.isDisabled}
              key={userType.key}
              id={userType.key}
              setValue={(value) => setFieldValue('profileType', value)}
              value={userType.value}
              isActive={userType.key === values.profileType}
            />
          ))}
        </div>
      </section>

      <div className="flex items-end justify-center mt-auto">
        <button
          type="submit"
          disabled={!R.isEmpty(errors)}
          className={classNames(
            'btn btn-primary text-white no-animation w-full sm:w-auto',
            {
              'loading btn-disabled': isUpdatingUser,
            }
          )}
        >
          {isUpdatingUser ? 'Updating user... ' : 'Save changes'}
        </button>
      </div>
    </Form>
  );
};

export default ProfilePanel;
