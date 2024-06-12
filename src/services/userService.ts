const API_URL = "http://localhost:8080/login"
const SIGNUP_API_URL = "http://localhost:8080/signup"
const PROFILE_API_URL = "http://localhost:8080/restricted/profile";
const UPDATE_PROFILE_API_URL = "http://localhost:8080/restricted/profile";

type User = { username: string, password: string, email: string }
type EndpointResponse = { token?: string, message?: string, level?: string }
type UserProfile = { username: string; email: string; };
type ProfileResponse = { username?: string, email?: string, message?: string };

export async function login(user: User): Promise<EndpointResponse | null> {
  const options = {
    method: "POST",
    body: JSON.stringify(user),
  }

  const response = await fetch(API_URL, options)
  if (response.status !== 200) return null

  return await response.json()
}

export async function signup(user: User): Promise<EndpointResponse | null> {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(SIGNUP_API_URL, options);
  if (response.status !== 201) {
    const errorResponse = await response.json();
    return { message: errorResponse.message || 'Signup failed' };
  }

  return await response.json();
}


export async function getProfile(token: string): Promise<ProfileResponse | null> {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch(PROFILE_API_URL, options);
  if (response.status !== 200) {
    const errorResponse = await response.json();
    return { message: errorResponse.message || 'Failed to fetch profile' };
  }

  return await response.json();
}

export async function updateProfile(user: UserProfile, token: string): Promise<ProfileResponse | null> {
  const options = {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(UPDATE_PROFILE_API_URL, options);
  if (response.status !== 200) {
    const errorResponse = await response.json();
    return { message: errorResponse.message || 'Failed to update profile' };
  }

  return await response.json();
}
