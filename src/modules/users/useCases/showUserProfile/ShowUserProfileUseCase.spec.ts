import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"



let createUserUseCase : CreateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfileUseCase:ShowUserProfileUseCase

describe("Show User", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()

        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)


    })

    it("should be show all users", async () => {
        
        const user :ICreateUserDTO ={
            
            name: "Teste Usuario",
            email: "test@1123",
            password: "test",
        } 
        
        
        const user01 = await createUserUseCase.execute(user)
        
        
        const resp = await showUserProfileUseCase.execute(user01.id)

        expect(resp.name).toEqual("Teste Usuario")
        expect(resp).toHaveProperty("id")

       

    })

    it ("should not able to return user with user id not exists",async ()=>{
        expect(async()=>{
            const user :ICreateUserDTO ={
            
                name: "Teste Usuario",
                email: "test@1123",
                password: "test",
            } 
            
            
            const user01 = await createUserUseCase.execute(user)
            
            await showUserProfileUseCase.execute("123456")
    
        }).rejects.toBeInstanceOf(AppError)
    })
})