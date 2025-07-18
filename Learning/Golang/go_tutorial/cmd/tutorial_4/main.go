package main

import "fmt"

func main() {
	fmt.Println("Tutorial 4")
	fmt.Println("---------------")

	var intArr [3]int8
	intArr[0] = 5
	intArr[1] = 9
	intArr[2] = 22
	fmt.Printf("\nintArr: %v\n", intArr)
	fmt.Printf("intArr[1]: %v\n", intArr[1])
	fmt.Printf("intArr[1:3]: %v\n", intArr[1:3])

	var firArr [3]int8 = [3]int8{1, 2, 3}
	fmt.Printf("\nfirArr: %v\n", firArr)
	fmt.Printf("firArr[1]: %v\n", firArr[1])
	fmt.Printf("firArr[1:3]: %v\n", firArr[1:3])
	
	secArr := [...]int8 {1, 2, 3}
	fmt.Printf("\nsecArr: %v\n", secArr)
	fmt.Printf("secArr[1]: %v\n", secArr[1])
	fmt.Printf("secArr[1:3]: %v\n", secArr[1:3])

	var intSlice []int8 = []int8{4, 5, 6}
	fmt.Println("\nintSlice:", intSlice)
	fmt.Printf("The length is %v with capacity %v\n", len(intSlice), cap(intSlice))
	intSlice = append(intSlice, 7)
	fmt.Println("(after) intSlice:", intSlice)
	fmt.Printf("(after) The length is %v with capacity %v\n", len(intSlice), cap(intSlice))

	var intSlice2 []int8 = []int8{8, 9}
	intSlice = append(intSlice, intSlice2...)
	fmt.Println("\nintSlice:", intSlice)

	var intSlice3 []int8 = make([]int8, 3, 8)
	fmt.Println("\nintSlice3:", intSlice3)
	fmt.Printf("The length is %v with capacity %v\n", len(intSlice3), cap(intSlice3))
}