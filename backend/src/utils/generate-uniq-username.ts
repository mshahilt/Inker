import { UserRepository } from "@/repositories/implementation/user.repository";

const userRepository = new UserRepository();

export const generateUniqueUsername = async (name: string) => {
  const baseUsername = name.trim().toLocaleLowerCase().replace(/\s+/g, "_");
  let username = baseUsername;

  while (await userRepository.findByUsername(username)) {
    const counter = Math.floor(100 + Math.random() * 900);
    username = `${baseUsername}${counter}`;
  }

  return username;
};
