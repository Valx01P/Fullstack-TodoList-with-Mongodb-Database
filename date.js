// module.exports.getDate = function() {
    exports.getDate = function() {

        //there is actually a function that tells us the day of the week sun-sat (0-6)
          const today = new Date();
        
          const options = {
            weekday: "long",
            day: "numeric",
            month: "long"
          };
        
          return today.toLocaleDateString("en-US", options);
        
        };
        
        
        // module.exports.getDay = function() {
        exports.getDay = function() {
        
        const today = new Date();
        
        const options = {
          weekday: "long"
        };
        
        return today.toLocaleDateString("en-US", options);
        }
        