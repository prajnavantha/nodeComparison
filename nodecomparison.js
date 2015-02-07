//@fileOverview: Finds similar nodes
//Steps:
// feed the widget which you selected.
// will get the widget and find comparison
// Scan the enitre dom for comparison and return matched nodes
// If you are here. Dont mess with it without knowing. Most of the thing is pure Javascript for effeciency
// And finally . All the best ;)
var nodeComparison = function(argument) {
    // body...
    var _srcNode_ = "";
    var _container_ = "";
    var _containerId_ = "";
    var _srcNodeTags_ = [];
    var _staticArr = [];
    var _ignoreList_ = [];
    var _ignoreVal_ = "";
    var _doIgnore_ = false;
    var _errCode_ = {
        'MATCHED': 0,
        'LENGTHFAIL': 1,
        'COMPARISONFAILED': 2,
        'DIFFERENTIALMATCH': 3
    };

    // feed the widget and the container to compare 
    function compareNode(srcObj, containerId, ignoreVal) {
        _srcNode_ = srcObj;
        _containerId_ = containerId;
        _staticArr.length = 0;
        buildTagArray(_srcNode_);
        _srcNodeTags_ = _staticArr;
        if (ignoreVal) {
            _doIgnore_ = true;
            _ignoreVal_ = ignoreVal
        }

        var _retVal, // this is the array of all child ele
            _tagName = _srcNode_.nodeName,
            _containerNode = $("#" + _containerId_),
            _chNode = _containerNode.find(_tagName) //.not("#testing"); // find all elements with same tag


        if (_chNode.length > 1) {
            _retVal = recursiveSearch(_chNode)
        }

        return _retVal;
    }

    // recursively scans through all elements and adds to array
    function buildTagArray(node) {
        var len = node.children.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                _staticArr.push(node.children[i].nodeName)
                buildTagArray(node.children[i]);
            };
        }
        return;
    }

    /* Traverse tree for sibling nodes and push its elements for comparison*/
    function traverseTree(obj) {
        var obj = obj //|| document.getElementsByTagName('testing')[0];
        var _compEle = []
        if (obj && obj.hasChildNodes()) {
            var child = obj.firstChild;
            while (child) {
                if (child.nodeType === 1) {
                    _compEle.push(child.nodeName)
                    traverseTree(child);
                }
                child = child.nextSibling;
            }
        }
        return _compEle;
    }

    function recursiveSearch(ch) {
        var _cNodes = ch,
            _retArr = [],
            _cLen = _cNodes.length,
            _srcLen = _srcNodeTags_.length, // length of all elements in srcNode
            _srcProp = {
                'width': _srcNode_.offsetWidth,
                'height': _srcNode_.offsetHeight
            },
            _temp,
            odd = (_cLen % 2 === 0) ? false : true;
        // effecint loop which runs in n/2
        for (var i = 0; i < _cLen / 2; i++) {
            _staticArr.length = 0;
            if (compareSpanThreshold(_srcProp, _cNodes[i])) {

                buildTagArray(_cNodes[i]);
                _temp = _staticArr;
                if (_temp.length === _srcLen) { // check length check 1
                    if (compareNodeStructure(_temp) === 0) {
                        if (_doIgnore_ && !_cNodes[i].getAttribute("data-widget-name")) {
                            _retArr.push(_cNodes[i]);
                        }
                    }
                }
            }

            if (odd && i === Math.floor((_cLen / 2)))
                break;

            console.log(_cNodes[_cLen - 1 - i])

            _staticArr.length = 0;
            // check for width if same
            if (compareSpanThreshold(_srcProp, _cNodes[_cLen - 1 - i])) {
                buildTagArray(_cNodes[_cLen - 1 - i]);
                _temp = _staticArr;
                if (_temp.length === _srcLen) { // check length check 1
                    if (compareNodeStructure(_temp) === 0) { // check for individual attr
                        if (_doIgnore_ && !_cNodes[_cLen - 1 - i].getAttribute("data-widget-name")) {
                            _retArr.push(_cNodes[_cLen - 1 - i]);
                        }
                    }
                }

            }
        };

        return _retArr;
    }


    function compareSpanThreshold(srcProp, destNode) {
        var _treshWidth = 10,
            _treshHeight = 10,
            _tWidth = destNode.offsetWidth,
            _tHeight = destNode.offsetHeight;
        if (((srcProp.width - _treshWidth) <= _tWidth) && (_tWidth <= (srcProp.width + _treshWidth))) {
            if (((srcProp.height - _treshHeight) <= _tHeight) && (_tHeight <= (srcProp.height + _treshHeight))) {
                return true

            }

        }

        return false

    }

    /* compare and return comparison result*/
    function compareNodeStructure(tagArray) {
        var _tagArray = tagArray,
            numberOfNodes = _tagArray.length;

        // for effeciency this is only O(n/2) 
        for (var i = 0; i < numberOfNodes; i++) {


            if (_tagArray[i] !== _srcNodeTags_[i]) {
                return 2 // ele mismatch
            }
            if (_tagArray[numberOfNodes - i - 1] !== _srcNodeTags_[numberOfNodes - i - 1]) {
                return 2
            }

        };
        return 0;
        // }
    }

    return {
        "initiate": compareNode
    }
}
