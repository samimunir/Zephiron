fn main() {
    println!("Variables & Mutability with Rust!");

    let my_name = "Sami";
    println!("my_name: {}", my_name);

    let my_num = 7;
    println!("my_num: {}", my_num);
    
    let addition = 11 + 12;
    println!("addition: {}", addition);

    let a = 9;
    println!("a: {}", a);

    let b = 3;
    println!("b: {}", b);

    let sum = a + b;
    println!("sum: {}", sum);

    let difference = a - b;
    println!("difference: {}", difference);

    let product = a * b;
    println!("product: {}", product);

    let quotient = a / b;
    println!("quotient: {}", quotient);

    let modulus = a % b;
    println!("modolus: {}", modulus);
}