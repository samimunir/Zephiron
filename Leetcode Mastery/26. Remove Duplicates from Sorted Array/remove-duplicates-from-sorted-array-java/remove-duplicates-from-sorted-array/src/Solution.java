public class Solution {
    private int[] nums;
    
    public Solution() {}

    public Solution(int[] nums) {
        this.nums = nums;
    }

    public void setNums(int[] nums) {
        this.nums = nums;
    }

    public int[] getNums() {
        return this.nums;
    }

    /*
     * Algorithm:
     * 
     * Runtime: 1ms
     * Memory: 44.82 MB
     */
    public int solutionOne(int[] nums) {
        if (nums.length == 1) {
            return 1;
        }

        int k = 0;
        int lastSeen = nums[0];

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > lastSeen) {
                k++;
                lastSeen = nums[i];
                nums[k] = nums[i];
            }
        }

        return k + 1;
    }
}