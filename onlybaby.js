/* Extension demonstrating a blocking reporter block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */


new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getBusiData = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'json',
              success: function( busi_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = busi_data['amount'];
                  callback(temperature);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Daily Sales of %s', 'getBusiData', '01'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Daily Sales', descriptor, ext);
})();
