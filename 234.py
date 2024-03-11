'''
234. Palindrome Linked List

Given the head of a singly linked list, return true if it is a 
palindrome or false otherwise.
'''
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Second Attempt after ChatGPT
        # Using fast, slow ptr method
        fast, slow = head, head
        prev = None

        while fast and fast.next:
            fast = fast.next.next

            # Reverse the first half
            next_temp = slow.next  # Temporarily store the next node
            slow.next = prev  # Reverse the current node's pointer
            prev = slow  # Move prev to the current node
            slow = next_temp  # Move to the next node in the list

        if fast:
            # Then the LL has an odd number of nodes
            list2 = slow.next
            slow.next = prev
            list1 = prev
        else:
            list1, list2 = prev, slow

        # Iterate through both lists comparing each value
        while list1 and list2:
            print(list1.val, list2.val)
            if list1.val != list2.val:
                return False
            else:
                list1, list2 = list1.next, list2.next

        return True

        # First Attempt
        word1 = ""
        word2 = ""

        # Forward pass O(n)
        curr = head
        prev = None
        while curr:
            word1 += str(curr.val)

            # Swap direction
            curr.next, prev, curr = prev, curr, curr.next

        # At the end of the loop prev will be at the end
        # ie it will be the head of the reversed LL
        # Backward pass O(n)
        curr = prev
        while curr:
            word2 += str(curr.val)
            curr = curr.next

        return word1 == word2
        # O(n) time, O(n) space
