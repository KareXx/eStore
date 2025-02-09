class UserDto{
    email;
    id;
    name;
    role;
    constructor(model){
        this.email = model.email
        this.id = model.id
        this.name = model.name
        this.role = model.role
    }
}

export default UserDto;