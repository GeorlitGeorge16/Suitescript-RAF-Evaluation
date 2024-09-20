/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author Jobin And Jismi IT Services LLP
 * @Date September 20,2024
 * @description online form for sales order creation
 */
define(['N/ui/serverWidget', 'N/search', 'N/record'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget, search, record) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {



                if (scriptContext.request.method === 'GET') {

                    let form = serverWidget.createForm({
                        title: 'Sales Order Form'
                    });

                    form.clientScriptModulePath = 'SuiteScripts/JobinAndJismi/RAF evaluation/jj_cs_raf_assess_question1.js';
                    var usergroup = form.addFieldGroup({
                        id: 'usergroup',
                        label: 'User Information'

                    });
                    usergroup.isSingleColumn = true;

                    let fName = form.addField({
                        id: 'custpage_jj_fname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'First Name',
                        container: 'usergroup'

                    });
                    fName.isMandatory = 'true';

                    let lName = form.addField({
                        id: 'custpage_jj_last_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Last Name',
                        container: 'usergroup'

                    });
                    lName.isMandatory = 'true';
                    let email = form.addField({
                        id: 'custpage_jj_email',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Email',
                        container: 'usergroup'

                    });
                    email.isMandatory = 'true';

                    let phone = form.addField({
                        id: 'custpage_jj_phonefield',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone Number',
                        container: 'usergroup'

                    });
                    phone.isMandatory = 'true';

                    var sublist = form.addSublist({
                        id: 'custpage_jj_sublist',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Items'
                    });

                    sublist.addField({
                        id: 'custpage_jj_items',
                        label: 'Items',
                        type: serverWidget.FieldType.SELECT,
                        source: 'item'
                    });


                    // let itemSearch = search.lookupFields({
                    //     type: search.Type.ITEM,
                    //     id:283,
                    //     columns: ['description']
                    // });
                    // log.debug("tte");
                    // let desc= itemSearch.description|| null;


                    sublist.addField({
                        id: 'custpage_jj_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item description'
                        // value:desc
                    });


                    let quantity = sublist.addField({
                        id: 'custpage_jj_quantity',
                        label: 'Quantity',
                        type: serverWidget.FieldType.INTEGER
                    });
                    quantity.isMandatory = 'true';

                    let price = sublist.addField({
                        id: 'custpage_jj_price',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Price'
                    });
                    price.isMandatory = 'true';

                    let amount = sublist.addField({
                        id: 'custpage_jj_amount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount'

                    });




                    form.addSubmitButton({
                        label: 'Submit'
                    });



                    scriptContext.response.writePage(form);
                }
                else if (scriptContext.request.method === 'POST') {
                    createRecord(scriptContext);
                }

            }
            catch (e) {
                log.debug({
                    title: 'Error in Executing',
                    details: e.stack
                });
            }


        }



        function createRecord(scriptContext) {
            try {
                let name = scriptContext.request.parameters.custpage_jj_fname;
                let name2 = scriptContext.request.parameters.custpage_jj_last_name;
                let email = scriptContext.request.parameters.custpage_jj_email;
                let phone = scriptContext.request.parameters.custpage_jj_phone;
                let item = scriptContext.request.parameters.custpage_jj_items;
                let quantity = scriptContext.request.parameters.custpage_jj_quantity;

                let RecordSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: ['email', 'is', email],
                    columns: ['entityid', 'email', 'internalid']
                });

                let searchResult = RecordSearch.run().getRange({
                    start: 0,
                    end: 1
                });

                log.debug('Search Length: ' + searchResult.length);
                if (searchResult.length > 0) {
                    RecordSearch.run().each(function (result) {
                        // let id = result.getValue('internalid');
                        let resultEmail = result.getValue('email');

                        if (email === resultEmail) {
                            var saleRecord = record.create({
                                type: record.Type.SALES_ORDER,
                                isDynamic: true,

                            });
                            // saleRecord.setValue(' orderstatus', 'SalesOrd:B');
                            // saleRecord.setText('entity', name);
                            //     saleRecord.setValue('trandate', 9/20/2024);
                            //     saleRecord.setValue('item', name2);
                            //    saleRecord.setValue('quantity', quantity);
                            //  saleRecord.setValue('phone', phone);

                        }
                        return true;
                    });
                }
                else {
                    let custRecord = record.create({
                        type: record.Type.CUSTOMER,
                        isDynamic: true,
                        ignoreMandatoryFields: true
                    });
                    custRecord.setValue('isperson', 'T');
                    custRecord.setValue('firstname', name);
                    custRecord.setValue('email', email);
                    custRecord.setValue('lastname', name2);
                    custRecord.setValue('subsidiary', '1');
                    custRecord.setValue('phone', phone);

                    let custRecordId = custRecord.save();
                    log.debug({
                        title: 'Record Created',
                        details: ' Record ID: ' + custRecordId
                    });

                    var saleRecord = record.create({
                        type: record.Type.SALES_ORDER,
                        isDynamic: true,

                    });
                }
            }
            catch (e) {
                log.debug({
                    title: 'Error in Creating record',
                    details: e.stack
                });
                log.debug(e.message);
                log.debug(e.cause);
            }
        }

        return { onRequest }

    });
