var searchIndex = JSON.parse('{\
"mcap":{"doc":"A library for manipulating Foxglove MCAP files, both …","t":"DNNNNNNNNNNDENNNNNREGDCNDCNNNNNNCCNLLLLLLLLLLLLLLLMLLLLLLLLMMMMMLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMLMAAMMLLLLLLMLLLLLLLLLLLLLLLLLLAMMMMMMMMMMMMMMDDNDDEDDDFMLLLLLLLLLLLLLLLLLLLMMLLLLLLLLLLFLLLLLLLLLLLLLLLLLLLLLLFMLLLLLLLLLLLLLLLLLLMLMLLLLLLLLLLLLLLLLLLLLLLLLLLLNDDNDNNDDNDNDNDNNDDNDDNDNENDDNDNNMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMMLLLMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMFMMMALMMLLLLLLLLLLLLLLLLMMMMMMMFLLLLLLLLLLLLLLLLMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMLLLLLLLLLLLLLLLLMMMMMMMMMMRRRRRRRRRRRRRRRCDDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL","n":["Attachment","BadAttachmentCrc","BadAttachmentLength","BadChunkCrc","BadChunkLength","BadDataCrc","BadFooter","BadIndex","BadMagic","BadSchemaLength","BadSummaryCrc","Channel","Compression","ConflictingChannels","ConflictingSchemas","InvalidSchemaId","Io","Lz4","MAGIC","McapError","McapResult","Message","MessageStream","Parse","Schema","Summary","UnexpectedChunkRecord","UnexpectedEoc","UnexpectedEof","UnknownChannel","UnknownSchema","UnsupportedCompression","WriteOptions","Writer","Zstd","as_any","as_any_mut","as_box_any","borrow","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","channel","clone","clone","clone","clone","clone_into","clone_into","clone_into","clone_into","create_time","data","data","data","encoding","eq","eq","eq","eq","fmt","fmt","fmt","fmt","fmt","fmt","fmt","from","from","from","from","from","from","from","from","hash","hash","into","into","into","into","into","into","log_time","log_time","media_type","message_encoding","metadata","name","name","provide","publish_time","read","records","schema","sequence","source","to_owned","to_owned","to_owned","to_owned","to_string","topic","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","type_id","write","available","available","available","calculated","calculated","calculated","calculated","header","header","header","saved","saved","saved","saved","ChunkFlattener","ChunkReader","IgnoreEndMagic","LinearReader","MessageStream","Options","RawMessage","RawMessageStream","Summary","attachment","attachment_indexes","bitand","bitor","bitxor","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","channels","chunk_indexes","clone","clone_into","default","enum_from_u32","enum_into_u32","eq","eq","eq","fmt","fmt","footer","from","from","from","from","from","from","from","from","get_channel","into","into","into","into","into","into","into","into","into_iter","into_iter","into_iter","into_iter","into_iter","metadata","metadata_indexes","new","new","new","new","new","new_with_options","new_with_options","new_with_options","new_with_options","next","next","next","next","next","not","read","read_message_indexes","sans_magic","schemas","seek_message","stats","stream_chunk","sub","to_owned","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","Attachment","AttachmentHeader","AttachmentIndex","AttachmentIndex","Channel","Channel","Chunk","ChunkHeader","ChunkIndex","ChunkIndex","DataEnd","DataEnd","Footer","Footer","Header","Header","Message","MessageHeader","MessageIndex","MessageIndex","MessageIndexEntry","Metadata","Metadata","MetadataIndex","MetadataIndex","Record","Schema","SchemaHeader","Statistics","Statistics","SummaryOffset","SummaryOffset","Unknown","attachment_count","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","channel_count","channel_id","channel_id","channel_message_counts","chunk_count","chunk_length","chunk_start_offset","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","clone_into","compressed_size","compressed_size","compression","compression","create_time","create_time","data_section_crc","data_size","default","default","default","encoding","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","eq","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","fmt","from","from","from","from","from","from","from","from","from","from","from","from","from","from","from","from","from","group_length","group_opcode","group_start","id","id","into","into","into","into","into","into","into","into","into","into","into","into","into","into","into","into","into","length","length","library","log_time","log_time","log_time","log_time","media_type","media_type","message_count","message_encoding","message_end_time","message_end_time","message_end_time","message_index_length","message_index_offsets","message_start_time","message_start_time","message_start_time","metadata","metadata","metadata_count","name","name","name","name","name","nanos_to_system_time","offset","offset","offset","op","opcode","profile","publish_time","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","read_options","records","schema_count","schema_id","sequence","summary_crc","summary_offset_start","summary_start","system_time_to_nanos","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","to_owned","topic","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","uncompressed_crc","uncompressed_size","uncompressed_size","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","write_options","data","data","data","data","data","header","header","header","header","opcode","ATTACHMENT","ATTACHMENT_INDEX","CHANNEL","CHUNK","CHUNK_INDEX","DATA_END","FOOTER","HEADER","MESSAGE","MESSAGE_INDEX","METADATA","METADATA_INDEX","SCHEMA","STATISTICS","SUMMARY_OFFSET","Metadata","WriteOptions","Writer","add_channel","attach","borrow","borrow","borrow_mut","borrow_mut","chunk_size","clone","clone_into","compression","create","default","drop","finish","flush","fmt","from","from","into","into","new","new","profile","to_owned","try_from","try_from","try_into","try_into","type_id","type_id","write","write_metadata","write_to_known_channel"],"q":["mcap","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","mcap::McapError","","","","","","","","","","","","","","mcap::read","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","mcap::records","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","mcap::records::Record","","","","","","","","","","mcap::records::op","","","","","","","","","","","","","","","mcap::write","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"d":["An attachment and its metadata in an MCAP file","","","","","","","","","","","Describes a channel which Messages are published to in an …","Compression options for chunks of channels, schemas, and …","","","","","","Magic bytes for the MCAP format","","","An event in an MCAP file, published to a Channel","","","Describes a schema used by one or more Channels in an MCAP …","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","","","","","Read MCAP files","Raw records parsed from an MCAP file","","","","","","","","","","","","","","","","","","","","","","","","","","","","Write MCAP files","","","","","","","","","","","","","","","Like <code>LinearReader</code>, but unpacks chunks’ records into its …","Streams records out of a Chunk, decompressing as needed.","Don’t require the MCAP file to end with its magic bytes.","Scans a mapped MCAP file from start to end, returning each …","Like <code>RawMessageStream</code>, but constructs a <code>Message</code> (complete …","Nonstandard reading options, e.g., to be more lenient when …","","Reads all messages from the MCAP file—in the order they …","Indexes of an MCAP file parsed from its (optional) summary …","Read the attachment with the given index.","","","","","","","","","","","","","","","","","","","","","Maps channel IDs to their channel","","","","","","","","","","","","Read the MCAP footer.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Gets the channel with the given ID (presumably from a …","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","Read the metadata with the given index.","","Create a reader for the given file, checking <code>MAGIC</code> bytes …","","","","","Create a reader for the given file with special options.","","","","","","","","","","Read the summary section of the given mapped MCAP file, if …","Read the mesage indexes for the given indexed chunk.","Like <code>new()</code>, but assumes <code>buf</code> has the magic bytes sliced off.","Maps schema IDs to their schema","Seek to the given message in the given indexed chunk.","","Stream messages from the chunk with the given index.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A raw record from an MCAP file.","","","","","","","A record of unknown type","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","","","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Opcodes for MCAP file records.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Writes an MCAP file to the given writer.","Adds a channel (and its provided schema, if any), …","","","","","","specifies the target uncompressed size of each chunk.","","","Specifies the compression that should be used on chunks.","Creates a <code>Writer</code> whch writes to <code>w</code> using the given options","","","Finishes any current chunk and writes out the rest of the …","Finishes the current chunk, if we have one, and flushes …","","Returns the argument unchanged.","Returns the argument unchanged.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","specifies the profile that should be written to the MCAP …","","","","","","","","Write the given message (and its provided channel, if …","","Write a message to an added channel, given its ID."],"i":[0,10,10,10,10,10,10,10,10,10,10,0,0,10,10,10,10,4,0,0,0,0,0,10,0,0,10,10,10,10,10,10,0,0,4,10,10,10,10,4,5,6,7,9,10,4,5,6,7,9,7,4,5,6,7,4,5,6,7,9,5,7,9,5,5,6,7,9,10,10,4,5,6,7,9,10,10,10,4,5,6,7,9,5,6,10,4,5,6,7,9,7,9,9,6,6,5,9,10,7,0,0,6,7,10,4,5,6,7,10,6,10,4,5,6,7,9,10,4,5,6,7,9,10,4,5,6,7,9,0,64,65,66,67,68,69,70,64,65,66,67,68,69,70,0,0,23,0,0,0,0,0,0,0,26,23,23,23,34,36,37,29,71,38,23,26,34,36,37,29,71,38,23,26,26,26,23,23,26,23,23,23,23,26,23,26,0,34,36,37,29,71,38,23,26,29,34,36,37,29,71,38,23,26,34,36,37,29,38,0,26,34,36,37,29,38,34,37,29,38,34,36,37,29,38,23,26,26,34,26,26,26,26,23,23,34,36,37,29,71,38,23,26,34,36,37,29,71,38,23,26,34,36,37,29,71,38,23,26,53,0,0,53,0,53,53,0,0,53,0,53,0,53,0,53,53,0,0,53,0,0,53,0,53,0,53,0,0,53,0,53,53,50,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,50,47,48,50,50,39,39,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,35,39,35,39,49,21,52,21,28,50,52,45,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,51,51,51,45,46,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,21,32,44,47,40,49,21,49,21,50,46,35,39,50,39,39,35,39,50,46,33,50,45,49,21,33,32,0,40,21,32,0,53,44,47,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,48,50,46,47,28,28,28,0,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,46,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,53,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,35,35,39,44,28,45,46,47,35,40,48,39,49,21,50,33,32,51,52,72,73,74,75,76,72,73,74,75,76,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,62,62,63,62,63,63,63,63,63,63,63,62,62,62,63,62,63,62,63,62,63,63,63,62,63,62,63,62,63,62,62,62],"f":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[[],1],[[],1],[[[3,[2]]],[[3,[1,2]]]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,[4,4],[5,5],[6,6],[7,7],[[]],[[]],[[]],[[]],0,0,0,0,0,[[5,5],8],[[6,6],8],[[7,7],8],[[9,9],8],[[10,11],12],[[10,11],12],[[4,11],12],[[5,11],12],[[6,11],12],[[7,11],12],[[9,11],12],[13,10],[14,10],[[]],[[]],[[]],[[]],[[]],[[]],[5],[6],[[]],[[]],[[]],[[]],[[]],[[]],0,0,0,0,0,0,0,[15],0,0,0,0,0,[10,[[17,[16]]]],[[]],[[]],[[]],[[]],[[],18],0,[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[21,[[22,[9]]]],0,[[23,[25,[[24,[23]]]]]],[[23,[25,[[24,[23]]]]]],[[23,[25,[[24,[23]]]]]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,0,[23,23],[[]],[[],26],[27,23],[23,27],[[23,24],8],[[23,23],8],[[26,26],8],[[23,11],12],[[26,11],12],[[],[[22,[28]]]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[29,30],[[17,[[31,[6]]]]]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[32,[[22,[33]]]],0,[[],[[22,[34]]]],[35,[[22,[36]]]],[[],[[22,[37]]]],[[],[[22,[29]]]],[[],[[22,[38]]]],[[[24,[23]]],[[22,[34]]]],[[[24,[23]]],[[22,[37]]]],[[[24,[23]]],[[22,[29]]]],[[[24,[23]]],[[22,[38]]]],[34,17],[36,17],[37,17],[29,17],[38,17],[23],[[],[[22,[[17,[26]]]]]],[[26,39],[[22,[[42,[[31,[6]],[41,[40]]]]]]]],[[],34],0,[[26,39,40],[[22,[7]]]],0,[[26,39],[[22,[43]]]],[[23,[25,[[24,[23]]]]]],[[]],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,0,0,0,0,0,0,[44,44],[28,28],[45,45],[46,46],[47,47],[35,35],[40,40],[48,48],[39,39],[49,49],[21,21],[50,50],[33,33],[32,32],[51,51],[52,52],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,0,0,0,0,0,0,0,[[],28],[[],50],[[],52],0,[[44,44],8],[[28,28],8],[[45,45],8],[[46,46],8],[[47,47],8],[[35,35],8],[[40,40],8],[[48,48],8],[[39,39],8],[[49,49],8],[[21,21],8],[[50,50],8],[[33,33],8],[[32,32],8],[[51,51],8],[[52,52],8],[[53,11],12],[[44,11],12],[[28,11],12],[[45,11],12],[[46,11],12],[[47,11],12],[[35,11],12],[[40,11],12],[[48,11],12],[[39,11],12],[[49,11],12],[[21,11],12],[[50,11],12],[[33,11],12],[[32,11],12],[[51,11],12],[[52,11],12],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,0,0,0,0,[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[54,55],0,0,0,0,[53,56],0,0,[57,[[58,[44]]]],[57,[[58,[28]]]],[57,[[58,[45]]]],[57,[[58,[46]]]],[57,[[58,[47]]]],[57,[[58,[35]]]],[57,[[58,[40]]]],[57,[[58,[48]]]],[57,[[58,[39]]]],[57,[[58,[49]]]],[57,[[58,[21]]]],[57,[[58,[50]]]],[57,[[58,[33]]]],[57,[[58,[32]]]],[57,[[58,[51]]]],[57,[[58,[52]]]],0,0,0,0,0,0,0,[55,54],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],0,[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],19],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],[[],20],0,0,0,[[44,59],58],[[28,59],58],[[45,59],58],[[46,59],58],[[47,59],58],[[35,59],58],[[40,59],58],[[48,59],58],[[39,59],58],[[49,59],58],[[21,59],58],[[50,59],58],[[33,59],58],[[32,59],58],[[51,59],58],[[52,59],58],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[[[62,[[0,[60,61]]]],6],[[22,[30]]]],[[[62,[[0,[60,61]]]],9],22],[[]],[[]],[[]],[[]],[[63,[17,[54]]],63],[63,63],[[]],[[63,[17,[4]]],63],[[63,[0,[60,61]]],[[22,[[62,[[0,[60,61]]]]]]]],[[],63],[[[62,[[0,[60,61]]]]]],[[[62,[[0,[60,61]]]]],22],[[[62,[[0,[60,61]]]]],22],[[63,11],12],[[]],[[]],[[]],[[]],[[[0,[60,61]]],[[22,[[62,[[0,[60,61]]]]]]]],[[],63],[[63,[25,[18]]],63],[[]],[[],19],[[],19],[[],19],[[],19],[[],20],[[],20],[[[62,[[0,[60,61]]]],7],22],[[[62,[[0,[60,61]]]],33],22],[[[62,[[0,[60,61]]]],47],22]],"p":[[8,"Any"],[3,"Global"],[3,"Box"],[4,"Compression"],[3,"Schema"],[3,"Channel"],[3,"Message"],[15,"bool"],[3,"Attachment"],[4,"McapError"],[3,"Formatter"],[6,"Result"],[4,"Error"],[3,"Error"],[3,"Demand"],[8,"Error"],[4,"Option"],[3,"String"],[4,"Result"],[3,"TypeId"],[3,"AttachmentIndex"],[6,"McapResult"],[4,"Options"],[3,"EnumSet"],[8,"Into"],[3,"Summary"],[15,"u32"],[3,"Footer"],[3,"RawMessageStream"],[15,"u16"],[3,"Arc"],[3,"MetadataIndex"],[3,"Metadata"],[3,"LinearReader"],[3,"ChunkHeader"],[3,"ChunkReader"],[3,"ChunkFlattener"],[3,"MessageStream"],[3,"ChunkIndex"],[3,"MessageIndexEntry"],[3,"Vec"],[3,"HashMap"],[8,"Iterator"],[3,"Header"],[3,"SchemaHeader"],[3,"Channel"],[3,"MessageHeader"],[3,"MessageIndex"],[3,"AttachmentHeader"],[3,"Statistics"],[3,"SummaryOffset"],[3,"DataEnd"],[4,"Record"],[15,"u64"],[3,"SystemTime"],[15,"u8"],[3,"ReadOptions"],[6,"BinResult"],[3,"WriteOptions"],[8,"Write"],[8,"Seek"],[3,"Writer"],[3,"WriteOptions"],[13,"BadAttachmentLength"],[13,"BadChunkLength"],[13,"BadSchemaLength"],[13,"BadAttachmentCrc"],[13,"BadChunkCrc"],[13,"BadDataCrc"],[13,"BadSummaryCrc"],[3,"RawMessage"],[13,"Schema"],[13,"Message"],[13,"Chunk"],[13,"Attachment"],[13,"Unknown"]]}\
}');
if (typeof window !== 'undefined' && window.initSearch) {window.initSearch(searchIndex)};
if (typeof exports !== 'undefined') {exports.searchIndex = searchIndex};
