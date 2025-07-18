/*
 * Leetcode #1 - Two Sum
 * > Java solution
 * 
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * 
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * 
 * You can return the answer in any order.
 * 
 * Example 1:
 *  Input: nums = [2, 7, 11, 15], target = 9
 *  Output: [0, 1]
 * 
 * Example 2:
 *  Input: nums = [3, 2, 4], target = 6
 *  Output: [1, 2]
 * 
 * Example 3:
 *  Input: nums = [3, 3], target = 6
 *  Output: [0, 1]
 */

import java.util.Arrays;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Leetcode #1 - Two Sum");
        System.out.println("-------------------------\n");

        Solution solution = new Solution();

        // Test Case 1
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test Case 1");
        System.out.println("---------------");
        System.out.println("Input: nums -> " + Arrays.toString(nums1) + "\n\ttarget -> " + target1);
        System.out.println("Output: " + Arrays.toString(solution.solutionThree(nums1, target1)));

        // Test Case 2
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        System.out.println("\nTest Case 2");
        System.out.println("---------------");
        System.out.println("Input: nums -> " + Arrays.toString(nums2) + "\n\ttarget -> " + target2);
        System.out.println("Output: " + Arrays.toString(solution.solutionThree(nums2, target2)));

        // Test Case 3
        int[] nums3 = {3, 3};
        int target3 = 6;
        System.out.println("\nTest Case 3");
        System.out.println("---------------");
        System.out.println("Input: nums -> " + Arrays.toString(nums3) + "\n\ttarget -> " + target3);
        System.out.println("Output: " + Arrays.toString(solution.solutionThree(nums3, target3)));
    }
}
