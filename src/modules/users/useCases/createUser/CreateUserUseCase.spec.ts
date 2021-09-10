import { rejects } from "assert";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    createUserRepositoryInMemory = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(createUserRepositoryInMemory);
  });

  it("should create new User", async () => {
    const user = await createUserUseCase.execute({
      name: "Teste Usuario",
      email: "test@1123",
      password: "test",
    });

    expect(user).toHaveProperty("id");
  });
  it("should not be create user with same email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Teste Usuario",
        email: "test@1123",
        password: "test",
      });
      await createUserUseCase.execute({
        name: "Teste Usuario",
        email: "test@1123",
        password: "test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
