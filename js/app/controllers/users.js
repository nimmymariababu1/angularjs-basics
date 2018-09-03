app.controller('UsersController',
    function UsersController($scope, $rootScope, Users) { //require Users factory to fetch data from service
        $scope.loading = true; //some web service call will take some time, we're showing message to user
        $scope.loadData = function(){
            
            if (localStorage.getItem('loaded') != null) {
            
                $scope.users = localStorage.getItem('users') && localStorage.getItem('users') != null ? JSON.parse(localStorage.getItem('users')) : [];
                return;
            }
            
            Users.getAll(function(users){
                
                localStorage.setItem('loaded', 'true');
                //web service call completed
                $scope.loading = false; //web service call completed, hiding loading message
                var addusers = localStorage.getItem('users') && localStorage.getItem('users') != null ? JSON.parse(localStorage.getItem('users')) : [];
                $scope.users = users.concat(addusers); //assigning webservice response to scope users, which is accessible by view template
                localStorage.setItem('users', JSON.stringify($scope.users));
                
            })
        }

        $scope.add = function(){
            $scope.action = 'create';
            $scope.selected_user = {};
        }

        $scope.edit = function(user_index){
            $scope.action = 'edit';
            $scope.edit_index    = user_index;
            $scope.selected_user = {};
            $scope.selected_user = angular.copy($scope.users[user_index]);
        }

        $scope.save = function(){
            var users = localStorage.getItem('users') && localStorage.getItem('users') != null ? JSON.parse(localStorage.getItem('users')) : [];
            users.push($scope.selected_user);
            localStorage.setItem('users', JSON.stringify(users));
            
            $scope.users = users;
            $scope.selected_user = {};
            $scope.action = '';
        }

        $scope.update = function(){
            var users =  localStorage.getItem('users') && localStorage.getItem('users') != null ? JSON.parse(localStorage.getItem('users')) : [];
            $scope.users[$scope.edit_index] = $scope.selected_user;
            $scope.selected_user = {};
            $scope.action = '';
            localStorage.setItem('users', JSON.stringify($scope.users));
        }

        $scope.remove = function(user_index){
            $scope.users.splice( user_index, 1 );        
        }
        
        $scope.loadData();
    }
)