app.directive('myNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/nav.html',
  };
});

app.directive('quoteInput', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/quoteInput.html',
  };
});

app.directive('quoteRender', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/quoteRender.html',
  };
});


app.directive('tradeTicket', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/tradeTicket.html',
  };
});

