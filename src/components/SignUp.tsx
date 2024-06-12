import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/services";
import { useUserStore } from '@/stores/userStore';
import { User } from "@/models";

export function SignUpButton() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loginState = useUserStore(state => state.login);

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await signup(formData);
      if (response?.message) {
        setErrorMessage(response.message);
        return;
      }

      const user: User = {
        username: formData.username,
        token: response?.token,
        level: response?.level,
      };
      loginState(user);
      setIsDialogOpen(false);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" id="form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              className="col-span-3"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="col-span-3"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="col-span-3"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 grid items-center gap-4">
              {errorMessage}
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button type="submit" variant="secondary">
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
