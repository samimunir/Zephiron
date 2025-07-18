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

	var myMap map[string]uint8 = make(map[string]uint8)
	fmt.Println("\nmyMap:", myMap)

	var myMap2 = map[string]uint8 {"Sami": 7, "Rahameen": 14}
	fmt.Println("\nmyMap2:", myMap2)
	fmt.Println("myMap2['Sami']:", myMap2["Sami"])
	var number, ok = myMap2["Abc"]
	if ok {
		fmt.Printf("The number: %v\n", number)
	} else {
		fmt.Println("Invalid name (key)")
	}
	delete(myMap2, "Sami")
	fmt.Println("\nmyMap2 after deleting a key 'Sami':", myMap2)

	var groceries = map[string]uint8 {"Apples": 5, "Milk": 1, "Bread": 2, "Chips": 2, "Bananas": 3}
	fmt.Println("\ngroceries:", groceries)
	for item, quantity := range groceries {
		fmt.Printf("Item: %v | %v\n", item, quantity)
	}

	fmt.Println()
	for i, v := range intArr {
		fmt.Printf("Index: %v, Value: %v\n", i, v)
	}

	fmt.Println()
	// Default Go for loop
	/*
	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}
	*/

	// Enhanced Go for loop
	for i := range 5 {
		fmt.Println(i)
	}
}