/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/log'],
    /**
     * @param{record} record
     * @param{search} search
     */
    function (record, search, log, currentRecord) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {



            let newRecord = scriptContext.currentRecord;
            let field_id = scriptContext.fieldId;
            if (field_id === 'custpage_jj_items' ) {

                let commission = quantity*price;
                record.setValue({
                    fieldId: 'custpage_jj_amount',
                    value: commission,
                    ignoreFieldChange: true
                });             
            }
            

                
              //  let myObj = displayOrders(newRecord);


            }

        // }



        // // function resultSearch(newRecord) {
        // //     let firstName = newRecord.getValue('custpage_jj_fname');
        // //     let lastName = newRecord.getValue('custpage_jj_last_name');
        // //     let email = newRecord.getValue('custpage_jj_email');
        // //     let phone = newRecord.getText('custpage_jj_phonefield')


        // //     let filters = [['mainline', 'IS', 'T']];
        // //     if (customerName) {
        // //         filters.push('AND', ['customer.internalid', 'anyOf', customerName]);
        // //     }
        // //     if (subsidiaryName) {
        // //         filters.push('AND', ['subsidiary.internalid', 'anyOf', subsidiaryName]);
        // //     }
        // //     if (deptName) {
        // //         filters.push('AND', ['department.internalid', 'anyOf', deptName]);
        // //     }


        // //     if (statusFilter) {
        // //         if (statusFilter === 'Pending Fulfillment') {
        // //             statusFilter = 'SalesOrd:B';
        // //         }
        // //         if (statusFilter === 'Partially Fulfilled'){
        // //             statusFilter = 'SalesOrd:D'
        // //         }
        // //         if (statusFilter === 'Pending Billing'){
        // //             statusFilter = 'SalesOrd:F'
        // //         }
        // //         filters.push('AND', ['status', 'anyof', statusFilter]);
        // //     }

        // //     log.debug("filters", filters);

        // //     let salesOrderSearch2 = search.create({
        // //         type: search.Type.SALES_ORDER,
        // //         filters: filters,
        // //         title: 'Custom_search_sales_order_JJ',
        // //         columns: [
        // //             'entity',    // Customer Name
        // //             'subsidiary',  // Subsidiary
        // //             'trandate',
        // //             'tranid',
        // //             'status',
        // //             'department',
        // //             'class',
        // //             'taxtotal',
        // //             'total',
        // //             'internalid'
        // //         ]
        // //     });
        // //     log.debug(salesOrderSearch2);
        // //     let resultSearch2 = salesOrderSearch2.run().getRange({
        // //         start: 0,
        // //         end: 100
        // //     });


        // //     log.debug("results", resultSearch2);
        // //     resultSearch2.forEach((result1, index) => {
        // //         let docNum1 = result1.getValue({ name: 'tranid' })
        // //         let transDate1 = result1.getValue({ name: 'trandate' })
        // //         let custName1 = result1.getText({ name: 'entity' })
        // //         let subsidiary1 = result1.getText({ name: 'subsidiary' })
        // //         let status1 = result1.getValue({ name: 'status' })
        // //         var department = result1.getText({ name: 'department' });
        // //         var tax = result1.getValue({ name: 'taxtotal' });
        // //         let class1 = result1.getText({ name: 'class' })
        // //         let total = result1.getValue({ name: 'total' });
        // //         let internalid1 = result1.getText({ name: 'internalid' });
        // //         var subtotal = total - tax;


        // //         newRecord.selectNewLine({
        // //             sublistId: 'custpage_sublist',
        // //             line: index
        // //         });

        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_customer_name',
        // //             line: index,
        // //             value: custName1,
        // //             ignoreFieldChange: true
        // //         });

        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_subsidiary',
        // //             line: index,
        // //             value: subsidiary1,
        // //             ignoreFieldChange: true
        // //         }) || '';

        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_date',
        // //             line: index,
        // //             value: transDate1,
        // //             ignoreFieldChange: true
        // //         }) || '';

        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_doc_no',
        // //             line: index,
        // //             value: docNum1,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_status',
        // //             line: index,
        // //             value: status1,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_department',
        // //             line: index,
        // //             value: department,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_subtotal',
        // //             line: index,
        // //             value: subtotal,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_total',
        // //             line: index,
        // //             value: total,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_tax',
        // //             line: index,
        // //             value: tax,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_class',
        // //             line: index,
        // //             value: class1,
        // //             ignoreFieldChange: true
        // //         }) || '';
        // //         newRecord.setCurrentSublistValue({
        // //             sublistId: 'custpage_sublist',
        // //             fieldId: 'custpage_internal_id',
        // //             line: index,
        // //             value: internalid1,
        // //             ignoreFieldChange: true
        // //         }) || '';


        // //         newRecord.commitLine({
        // //             sublistId: 'custpage_sublist'
        //         });

        //     });
        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Subli  st name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {

        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {

        }

        return {
            // pageInit: pageInit,
            fieldChanged: fieldChanged
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
