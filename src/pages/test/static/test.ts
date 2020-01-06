class Fish {
    swim(){}
}

class Bird {
    fly(){}
}

function getPet(pet: Fish | Bird) : Fish | Bird {
    return pet
}

function isFish(pet: Fish | Bird) : pet is Fish {
    return (<Fish>pet).swim !== undefined
}

export default function init() {}