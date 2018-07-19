
import { ContentItem, Fields } from 'kentico-cloud-delivery';

/**
 * This class was generated by 'kentico-cloud-model-generator-utility' at Thu Jul 19 2018 19:18:42 GMT+0200 (South Africa Standard Time).
 *
 * Note: You can substitute 'ContentItem' type with another generated class. Generator doesn't have this information available
 * and so its up to you to define relationship between models.
 */
export class CardComponentModel extends ContentItem {
    public body: Fields.RichTextField;
    public image: Fields.AssetsField;
    public header: Fields.TextField;
    public title: Fields.TextField;
    public redirect: Fields.TextField;
}
