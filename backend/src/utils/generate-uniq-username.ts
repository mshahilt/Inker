import { UserRepository } from "@/repositories/implementation/user.repository";

const userRepository = new UserRepository();

export const generateUniqueUsername = async (name: string) => {
  try {
    const baseUsername = name.trim().toLocaleLowerCase().replace(/\s+/g, "_");
    let username = baseUsername;

    while (await userRepository.findByUsername(username)) {
      let counter = Math.floor(100 + Math.random() * 900);
      username = `${baseUsername}${counter}`;
    }

    return username;
  } catch (error) {
    throw error;
  }
};
