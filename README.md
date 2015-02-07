# nodeComparison
## Compare nodes and find similar nodes:

Aims to provide comparison between two different elements.Mostly core javascript is used to perfrm iteration with some parts jquery

#### Pre-Requisite:
jquery

#### Comparison Criteria:
Width and Height of the element
Number of nodes in each element
Comparing each tag element in sequence

#### How it works:
*Feed the div to be compared, The container to be searched, pointer to div container to be ignored
*The algorithm will scan the entire document to find comparison
*Returns a list of compared nodes

eg:
'''
nodeCompare = new nodeComparison
nodeCompare.initiate(widget, "content", "data-widget-name")
'''
Here:
widget = div to be compared
content = the id of the container to be searched for widget
data-widget-name = ignore div which has data-widget-name assigned



