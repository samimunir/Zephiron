fn main() {
    println!("Variables & Mutability with Rust!");
    println!("---------------------------------\n");

    let my_name = "Sami";
    println!("my_name = {}", my_name);

    let my_num = 7;
    println!("my_num = {}", my_num);
    
    let addition = 11 + 12;
    println!("addition of 11 + 12 = {}", addition);

    let a = 9;
    println!("a = {}", a);

    let b = 3;
    println!("b = {}", b);

    let sum = a + b;
    println!("sum of {} + {} = {}", a, b, sum);

    let difference = a - b;
    println!("difference of {} - {} = {}", a, b, difference);

    let product = a * b;
    println!("product of {} * {} = {}", a, b, product);

    let quotient = a / b;
    println!("quotient of {} / {} = {}", a, b, quotient);

    let modulus = a % b;
    println!("modolus of {} % {} = {}", a, b, modulus);

    /*
        - Place an underscore (_) before a variable name to explicitly define it as unused.

        - Variables are immutable by default (cannot be changed/altered).
            > use the "mut" keyword to make a variable mutable.
    */

    let mut fav_num = 10;
    println!("\nfav_num (before) = {}", fav_num);
    fav_num = 7;
    println!("fav_num (after) = {}", fav_num);

    /*
        - Every compiler error has a corresponding ERROR_CODE
            > Use the following command to explain the ERROR_CODE
                --> rustc --explain E____
    */

    /*
        Variable Shadowing
        - different than reassigning am existing mutable variable.
        - It is redeclaring a variable from scratch.
        - Almost allows a way to version a variable...
    */
    let num = "3.14";
    println!("\nnum = {}", num);
    let num = 3.14;
    println!("num = {}", num);
}