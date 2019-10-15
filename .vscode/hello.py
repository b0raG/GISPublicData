# from owslib.wms import WebMapService
# wms = WebMapService("http://gis.ktimanet.gr/wms/wmsopen/wmsserver.aspx")
# print(wms.identification.title)
# print(wms.identification.type)
# print(wms.identification.version)
# print(list(wms.contents))
# print(wms['BASEMAP'].title)
# print(list(op.name for op in wms.operations))


from owslib.wfs import WebFeatureService
wfs = WebFeatureService("http://gis.epoleodomia.gov.gr/arcgis/services/Rimotomika_Sxedia_Poleod_Meletes/OikodomikaTetragona/MapServer/WFSServer?request=DescribeFeatureType&service=WFS&version=1.2.0", version='1.2.0')
print(wfs.identification.title)
print(wfs.identification.type)
print(wfs.identification.version)
print(list(wfs.contents))
print(wfs['Rimotomika_Sxedia_Poleod_Meletes_OikodomikaTetragona:Οικοδομικά_Τετράγωνα'].title)
print(list(op.name for op in wfs.operations))
print(list(op.name for op in wfs.features))