
# drip-drop-backend

Front-end repository: https://github.com/the-best-org-lab/drip-drop-frontend

Our App:
 A Dropbox-like app that allows users to upload files into a virtual file system.
 Ordinary users can only read/download a file where as Owners can do anything to
 the files they own.

 Routes;
 Create - .../files, uses '.create' method
 Read - .../files and .../files/Id, Index and Show actions use '.find' and
 '.json' methods.
 Update - .../files/Id, uses the '.update' method
 Delete/Destroy - .../files/Id, uses the '.remove' method
