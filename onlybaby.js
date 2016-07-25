/* Extension demonstrating a blocking reporter block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */


var _debug = true;
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

    ext.getRTAmount = function(site, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: `http://pos.infoman.com.cn/posdev/getrtsales.php?task=amount&site=${site}`,
              dataType: 'json',
              success: function( data ) {
						if(_debug) console.log(data);
						 amount = data['amount'];
						 if(amount)	amount = Math.round(amount*100)/100;
						 // else
						//	  amount = '';
					    if(callback) callback(amount);
              }
        });
    };

	ext.getAllAmounts = function(date) {
			window.open(`http://pos.infoman.com.cn/posdev/forkcaller.php?amountdate=${date}`,_blank,'menu=no');
    };

	ext.num2fixLenStr = function(num,len){
		var tmp = '0'.repeat(len) + num;
		return tmp.substring(tmp.length,tmp.length - len);
	}
	
	ext.today = function(){return today};
	ext.date = function(indate){return indate};
	
    // Block and block menu descriptions

    var descriptor = {
        blocks: [
        	['r', '����','today']
        	['r','���ڣ� %s','date',today],
			['r','����ת������ N = %s L = %s ','num2fixLenStr',1,2],ʵʱ
        	['R', 'ʵʱӪҵ�� ��ţ�%s', 'getRTAmount', '01']
			[' ', ' ȫ��Ӫҵ�� ���ڣ�%s', 'getAllAmount', today]

        ]
    };

    // Register the extension
    ScratchExtensions.register('Daily Sales', descriptor, ext);
})();
