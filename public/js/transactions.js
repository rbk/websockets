

function TransactionsList( $scope, $http ) {
		$http.get( 'transactions.json').success(function(data){
			$scope.transactions = data; 
			$scope.totalTransactions = data.length;
			$scope.totalAmount = get_total( data );
		});
}


function get_total( data ) {
	var total = 0;
	for( var i = 0; i < data.length; i++ ){
		if( isNaN(data[i].totalAmount)  ) {

		} else {

		total = parseFloat( data[i].totalAmount ) + parseFloat( total );
		}
	}
	return total.toFixed(2);
}