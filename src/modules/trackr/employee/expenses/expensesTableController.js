define(['lodash'], function(_) {
    'use strict';
    function expensesTableController($scope, Restangular, ConfirmationDialogService, createOrUpdateModalService) {
        $scope.expenses = [];

        /**
         * Remove an expense from the report.
         * @param expense The expense to remove.
         */
        $scope.removeExpense = function(expense) {
            function deleteExpense() {
                Restangular.one('travelExpenses', expense.id).remove().then(function() {
                    _.remove($scope.expenses, {id: expense.id});
                });
            }

            ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteExpense);
        };

        /**
         * Opens the edit form for a single expense and updates the list if the user edited the expense.
         * @param expense
         */
        $scope.showEditForm = function(expense) {
            var $modalInstance = createOrUpdateModalService
                .showModal('trackr.employee.expenses.expenseEditController as ctrl',
                'src/modules/trackr/employee/expenses/expense-edit.tpl.html',
                'ACTIONS.EDIT', {
                    expense: expense
                });

            $modalInstance.result.then(function(editedExpense) {
                var index = _.findIndex($scope.expenses, {id: editedExpense.id });
                $scope.expenses[index] = editedExpense;
            });
        };

    }

    expensesTableController.$inject = ['$scope', 'Restangular', 'base.services.confirmation-dialog', 'shared.services.create-or-update-modal'];
    return expensesTableController;
});