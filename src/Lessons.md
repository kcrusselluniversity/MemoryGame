## LESSSONS LEARNT

* 4 hours of coding saves 20 minutes of planning!  
i.e. spend time planning how you are going to manage state,  
what contents should be in an element/object, then write the code. 

* Same goes for CSS, instead of just adding display: flex everywhere  
and mucking around, just think about the minimal number of changes  
that need to be made to achieve the desired result

* If you find your writing spaghetti, literally just take a break and come
back to it.  
If you don't you are just making more work for yourself!

* Don't use useEffect just to make it easy, if you're using useEffect for  
anything other than a sideEffect that occurs outside the React tree then  
you're probably using it wrong.  

* useEffect should be used to sync your app with <b>outside</b> resources  
such as APIs. If you are updating state based on other state then you should  
consider whether that state is calculated, or consider if the state is  
being changed based on an Event, in which it should be handled by an  
EventHandler
