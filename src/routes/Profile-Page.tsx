import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, getProfile } from "@/services";
import { useUserStore } from '@/stores/userStore';
import { DropdownProfile } from '@/components';
import { Logo } from '@/components/Logo';
import { ModeToggle } from '@/components/mode-toggle';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useUserStore(state => ({
    user: state.user,
    updateUser: state.login
  }));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user.token === undefined) return
        const profileData = await getProfile(user.token);
        if (profileData === null) return

        if (profileData.username === undefined ||
          profileData.email == undefined) {
          return
        }

        const formData = {
          username: profileData.username,
          email: profileData.email
        }

        setFormData(formData);
      } catch (error) {
        setErrorMessage('Failed to load profile data.');
      }
    };

    fetchProfile();
  }, [user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (user.token === undefined) return
      const response = await updateProfile(formData, user.token);

      if (response?.message) {
        setErrorMessage(response.message);
        return;
      }

      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <main className="flex flex-col h-screen p-4 w-[1200px] m-auto">
      <header className="flex items-center justify-between">
        <section>
          <Logo />
        </section>
        <section className="flex gap-2">
          <ModeToggle />
          <DropdownProfile />
        </section>
      </header>
      <div className="rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username" className="block mb-1">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 mb-4">
              {successMessage}
            </div>
          )}
          <Button type="submit" variant="secondary" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </main>
  );
}
