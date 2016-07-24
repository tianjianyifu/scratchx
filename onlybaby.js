/* Extension demonstrating a blocking reporter block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */


new (function() {
    var ext = this;

	var today = new Date().toISOString().replace(/([\/\-]+)|(T[0-9:\.]+Z)/g,'');
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getBusiData = function(date,site, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: `http://pos.infoman.com.cn/posdev/getcachedata.php?date=${date}`,
              dataType: 'json',
              success: function( cacheData ) {
				  console.log(cacheData);
                  amount = cacheData[site]['amount'];
                  callback(amount);
              }
        });
    };

	ext.getAmount = function(amount){
		console.log(amount);
		return amount;
	}
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Daily Sales of %s', 'getBusiData',today, '01','getAmount'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Daily Sales', descriptor, ext);
})();
