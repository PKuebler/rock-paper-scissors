var connection = new WebSocket('ws://localhost:8081');

var wait = false;

$('.btn').on('click', function() {
	// Wait on Opponent
	if (wait)
		return;

	wait = true;
	$(this).addClass('btn--active');

	var id = $(this).attr('id');
	connection.send(id.replace(/^btn-/, ''));
});

connection.onmessage = function(e) {
	wait = false;
	$('.btn').removeClass('btn--active');

	var data = JSON.parse(e.data);

	var m = $('<div />');
	m.addClass('battlelog');
	m.text('you '+data.result+'. '+ data.player +' VS '+data.opponent);

	$('.message').prepend(m);
	console.log(data);
}