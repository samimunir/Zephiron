// CONSTANTS
const TAX_RATE: f64 = 7.257;

// TYPE ALIASES
type Meters = i32;

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

    /*
        Scope (independent area/region of execution).
    */
    let mut x = 7;
    println!("\nx (before block code) = {}", x);
    {
        let step = 2;
        x += step;
    }
    println!("x (after block code) = {}", x);

    /*
        Constants vs. Immutable vars

        - A constant is a name assigned to a value. A constant's value cannot change.
        - Cannot use "mut" keyword with constants.
        - A constant has GLOBAL scope; variables are limited to function scope.
        - A constant's value must be known at compile time.
    */
    print_tax_rate();

    /*
        Type Aliases
        - An alternate name that we can assign to an existing type.
        - Provide additional context regarding what that type represents.
    */
    let mile_race_length: Meters = 1600;
    println!("\nmile_race_length = {}", mile_race_length);

    /*
        A compiler directive is an annotation that tells the compiler how to parse the source code.
        - an instruction to the compiler
        - E.g.: allow(__type__)
    */
    #[allow(unused_variables)]
    let temp: i8 = 24;
}

fn print_tax_rate() {
    println!("\nThe tax rate is {TAX_RATE}.");
}