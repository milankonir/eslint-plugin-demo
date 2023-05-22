import { TSESLint } from '@typescript-eslint/utils';
import path from 'path';
import { ImportTypeNode } from 'typescript';

/*
 * This rule ensures that all files are organized in pacakges accoriding to guidelines.
 */
interface PackageLayer {
  name: string;
  index: number;
}

type PackageOrganizationOptions = [{ layers: PackageLayer[] }];

const rule: TSESLint.RuleModule<
  'invalidLocation' | 'invalidPackageName' | 'unknownLayer' | 'layerViolation',
  PackageOrganizationOptions
> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures that relative imports only come from allowed layer',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/06-package-organization.ts',
    },
    schema: [
      {
        type: 'object',
        properties: {
          layers: {
            description: 'List of allowed layers',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  description: 'Name of the layer',
                  type: 'string',
                },
                index: {
                  description: 'Index / priority of the layer',
                  type: 'number',
                },
              },
            },
          },
        },
      },
    ],
    messages: {
      invalidLocation: 'Modules can only live inside packages/<package-name> folder.',
      invalidPackageName:
        'The package name must match pattern XX-<package-name>, only ascii characters, numbers and dashes are allowed in the package name.',
      unknownLayer: 'Package modules must live inside one of allowed layers {{ layers }}.',
      layerViolation: 'Layer {{ currentLayer }} cannot import from {{ importLayer }}.',
    },
  },
  defaultOptions: [{ layers: [] }],
  create(context) {
    const cwd = context.getCwd();

    if (context.getFilename().endsWith('.js')) {
      return;
    }

    const layers = context.options[0]?.layers ?? [];

    function getLayerFromPath(fileName: string) {
      const relativePath = path.relative(cwd, fileName);
      const relativePathMatch = relativePath.match(/packages\/([^\/]+)\/(.*)/);

      const packageName = relativePathMatch?.[1];
      const packageRelativeFileName = relativePathMatch?.[2];

      const layerMatch = packageRelativeFileName?.match(/([^\/]*)\/?(.*)?/);
      const layerName = layerMatch?.[1];
      const layer = layers.find(layer => layer.name === layerName);

      return { packageName, layer, packageRelativeFileName };
    }

    const { packageName, packageRelativeFileName, layer } = getLayerFromPath(context.getFilename());

    return {
      ImportDeclaration: node => {
        if (layers.length === 0) {
          return;
        }

        const importValue = node.source.value;

        if (importValue.startsWith('.')) {
          const { layer: importLayer } = getLayerFromPath(path.resolve(context.getFilename(), '..', importValue));

          if (layer && importLayer && importLayer.index > layer.index) {
            context.report({
              messageId: 'layerViolation',
              node,
              data: {
                currentLayer: layer.name,
                importLayer: importLayer.name,
              },
            });
          }
        }
      },

      Program: node => {
        if (!packageName) {
          context.report({
            node,
            messageId: 'invalidLocation',
          });

          return;
        }

        if (packageName !== 'eslint-plugin' && !packageName.match(/[0-9]{2}-[a-zA-Z0-9-]/)) {
          context.report({
            node,
            messageId: 'invalidPackageName',
          });
        }

        if (layers.length === 0) {
          return;
        }

        if (packageRelativeFileName === 'index.ts') {
          return;
        }

        if (!layer) {
          context.report({
            node,
            messageId: 'unknownLayer',
            data: {
              layers: layers.map(layer => layer.name).join(', '),
            },
          });
        }
      },
    };
  },
};
export default rule;
