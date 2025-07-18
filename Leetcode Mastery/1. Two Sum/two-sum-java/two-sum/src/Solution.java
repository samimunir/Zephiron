// import java.util.HashMap;

public class Solution {
    private int[] nums;
    private int target;

    public Solution() {}

    public Solution(int[] nums, int target) {
        this.nums = nums;
        this.target = target;
    }

    public void setNums(int[] nums) {
        this.nums = nums;
    }

    public int[] getNums() {
        return this.nums;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public int getTarget() {
        return this.target;
    }

    /*
     * Algorithm:
     * 
     * Runtime: 45ms
     * Memory: 44.96 MB
     */
    public int[] solutionOne(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] == complement && i != j) {
                    return new int[] {i, j};
                }
            }
        }
        return null;
    }
}