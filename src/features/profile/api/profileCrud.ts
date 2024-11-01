import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const financeApi = import.meta.env.VITE_API_GATEWAY_URL;

// Define the types for the profile data
interface Profile {
  id: string;
  username: string;
  age: number;
  bio: string;
  email: string;
  position: string;
  location: string;
  avatarUrl: string;
}

// Define the API calls
const getProfile = async (id: string): Promise<Profile> => {
  const response = await axios.get<Profile>(`${financeApi}/profile/${id}`);
  return response.data;
};

const postProfile = async (newProfile: Profile): Promise<Profile> => {
  const response = await axios.post<Profile>(
    `${financeApi}/profile`,
    newProfile
  );
  return response.data;
};

const updateProfile = async (updatedProfile: Profile): Promise<Profile> => {
  const response = await axios.put<Profile>(
    `${financeApi}/profile/${updatedProfile.id}`,
    updatedProfile
  );
  return response.data;
};

const deleteProfile = async (id: string): Promise<void> => {
  await axios.delete(`${financeApi}/profile/${id}`);
};

// Custom hooks for CRUD operations
export function useGetProfile(id: string) {
  return useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });
}

export function usePostProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["profile", data.id] });
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["profile", variables] });
    },
  });
}
