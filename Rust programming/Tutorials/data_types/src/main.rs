fn main() {
    println!("Data Types in Rust!");
    println!("---------------------------------\n");

    /*
        Data Types
        - every Rust value has a data type.
        - Rust is a statically-typed language, which means the compiler
            must know the types of all variables at compile time,
        - The compiler can infer the types of variables based on their
            initial assignments.

        - Scalar types: holds a single avlue
            > integers
            > floating-point
            > Booleans
            > characters

        - Unsigned vs. Signed
            > Signed integers support positive & negative values; prefixed
                with "i".
            > Unsigned integers only support zero and positive values; they
                can store a larger max value in the positive direction; prefixed
                with "u". 
    */

    let eight_bit: i8 = -112;
    println!("\neight_bit = {}", eight_bit);
    /*
        let eight_bit: i8 = -210;
        
        --> this will not compile because the value -210 is outside range of i8.
    */

    let sixteen_bit_unsigned: u8 = 7;
    println!("sixteen_bit_unsigned = {}", sixteen_bit_unsigned);
}