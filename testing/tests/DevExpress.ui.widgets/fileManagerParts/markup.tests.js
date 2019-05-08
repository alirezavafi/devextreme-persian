const { test } = QUnit;
import $ from "jquery";
import "ui/file_manager";
import fx from "animation/fx";
import { FileManagerWrapper, createTestFileSystem } from "../../../helpers/fileManagerHelpers.js";

const getDefaultConfig = () => {
    return {
        fileProvider: createTestFileSystem(),
        itemView: {
            mode: "thumbnails"
        },
        permissions: {
            create: true,
            copy: true,
            move: true,
            remove: true,
            rename: true,
            upload: true
        }
    };
};

const moduleConfig = {

    beforeEach: function() {
        this.clock = sinon.useFakeTimers();
        fx.off = true;

        this.prepareFileManager = options => {
            const config = $.extend(true, getDefaultConfig(), options || {});
            this.$element = $("#fileManager").dxFileManager(config);
            this.wrapper = new FileManagerWrapper(this.$element);
            this.clock.tick(400);
        };
    },

    afterEach: function() {
        this.clock.tick(5000);

        this.clock.restore();
        fx.off = false;
    }

};

QUnit.module("Markup rendering", moduleConfig, () => {

    test("customize thumbnail", function(assert) {
        let counter = 0;

        this.prepareFileManager({
            customizeThumbnail: item => {
                if(item.isDirectory) {
                    return "";
                }
                counter++;
                return "image";
            }
        });

        assert.equal(counter, 3, "function called");
        assert.equal(this.wrapper.getCustomThumbnails().length, counter, "custom thumbnails rendered");
    });

});
