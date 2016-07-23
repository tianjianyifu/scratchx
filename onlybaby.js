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

    ext.getBusiData = function(site, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://pos.infoman.com.cn/posdev/getcachedata.php',
              dataType: 'json',
              success: function( cacheData ) {
                  // Got the data - parse it and return the temperature
                  amount = cacheData[site]['amount'];
                  callback(amount);
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
