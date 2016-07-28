(function() {
    'use strict';

    angular.module('chatApp')
    .directive('chatBox', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/chatBox.html',
            controller: function($scope, $element) {
                $scope.$watch('messageLog', function() {
                  //var textArea = $element[0].children[0];


                  //textArea.scrollTop = textArea.scrollHeight;

                    var chatBody = $element[0].children[0].children[1].children[0].children[0].children[1];

                    chatBody.scrollTop = chatBody.scrollHeight;



                  console.log($scope.messageTest); 
                });
            }
        };
    });

}());


/*
<textarea style="width: 100%; height: 200px" ng-disable="true" ng-model="messageLog"></textarea>*/
