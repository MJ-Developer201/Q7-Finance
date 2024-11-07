import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const financeApi = import.meta.env.VITE_API_GATEWAY_URL;

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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile", data.id] });
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["profile", variables] });
    },
  });
}
